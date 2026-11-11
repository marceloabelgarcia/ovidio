import { Father } from './father'
import { currentLevel, withLevel } from './level'
import { Mother, type ChildSpec, type ShellApi } from './mother'
import type { Port } from './port'
import { Resources } from './resources'
import { subjects, type PrimitiveEvent } from './types'

type UxCtor = new (port?: Port) => unknown
type MachineEvent = 'sending' | 'sended'

/**
 * Contenedor: Mother + Resources + Father.
 * port.output vive en Resources → Father decide cuándo emitUp.
 */
export class Widget {
  readonly mother: Mother
  readonly port: Port
  readonly resources: Resources
  readonly father: Father
  readonly #id = Symbol(this.constructor.name)
  readonly #parent?: Widget

  constructor(Ux: UxCtor, Children: ChildSpec[] = [], port: Port = {}) {
    this.port = port
    this.resources = new Resources()
    this.resources.setOutputs(port.output)
    this.father = new Father(this.resources, (e) => this.#ascend(e))

    const parent = currentLevel()
    this.#parent = parent?.widget

    if (parent && port.trigger) {
      parent.resources.register({
        id: this.#id,
        types: port.input ? [port.input] : [],
        triggers: {
          [port.trigger]: (event) => this.#deliver(event),
        },
      })
    }

    let mother!: Mother
    withLevel(
      { resources: this.resources, father: this.father, widget: this },
      () => {
        mother = new Mother(Ux, Children, port)
      },
    )
    this.mother = mother

    this.mother.ux.on?.((verb, payload) => this.#fromShell(verb, payload))

    const type = port.input
    if (
      parent &&
      port.trigger &&
      type &&
      parent.resources.values[type] !== undefined
    ) {
      this.#deliver({
        subject: subjects.user,
        verb: port.trigger,
        type,
        value: parent.resources.values[type],
      })
    }
  }

  #shellApi(): ShellApi {
    return {
      port: this.port,
      notifyMachine: (h, d) => this.#notifyMachine(h, d),
      notifyParent: (e) => this.#emit(e),
    }
  }

  #deliver(event: PrimitiveEvent): void {
    this.mother.ux.react?.(event, this.#shellApi())
    this.mother.ux.apply?.(event.value)
    this.resources.runTriggers(event.verb, event)
  }

  #fromShell(verb: string, payload?: unknown): void {
    if (!this.port.input || !this.#parent) return

    Mother.tell(this.constructor.name.toLowerCase(), verb, payload)

    const action = verb === this.port.input
    this.#emit({
      subject: subjects.user,
      verb,
      type: action ? 'trigger' : this.port.input,
      value: action ? null : payload,
    })
  }

  #emit(event: PrimitiveEvent): void {
    if (this.#parent) {
      this.#parent.resources.accept(event, this.#id)
    } else {
      this.resources.accept(event, this.#id)
    }
  }

  #ascend(event: PrimitiveEvent): void {
    this.#parent?.resources.accept(event, this.#id)
  }

  #notifyMachine(happened: MachineEvent, detail?: unknown): void {
    Mother.tell(this.constructor.name.toLowerCase(), happened, detail)
    this.bubbleBusy(happened === 'sending')
  }

  bubbleBusy(on: boolean): void {
    this.mother.ux.busy?.(on)
    this.#parent?.bubbleBusy(on)
  }
}
