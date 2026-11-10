import { Father } from './father'
import { currentLevel, withLevel } from './level'
import { Mother, type ChildSpec } from './mother'
import type { Port } from './port'
import { Resources } from './resources'
import type { PrimitiveEvent } from './types'

type UxCtor = new (port?: Port) => unknown

/**
 * Nivel: Mother (carcasa) + Resources/Father (datos).
 * Con port.input se registra en el Resources del padre.
 */
export class Widget {
  readonly mother: Mother
  readonly port: Port
  readonly resources: Resources
  readonly father: Father
  readonly #id = Symbol(this.constructor.name)
  readonly #emitToParent?: (event: PrimitiveEvent) => void

  constructor(Ux: UxCtor, Children: ChildSpec[] = [], port: Port = {}) {
    this.port = port
    this.resources = new Resources()
    this.father = new Father(this.resources, (e) => this.ascend(e))

    const parent = currentLevel()
    const type = port.input

    if (parent && type) {
      parent.resources.register({
        id: this.#id,
        types: [type],
        triggers: {
          changed: (event) => this.pull(event),
        },
      })
      this.#emitToParent = (event) => parent.father.receive(event, this.#id)
    }

    let mother!: Mother
    withLevel({ resources: this.resources, father: this.father }, () => {
      mother = new Mother(Ux, Children, port)
    })
    this.mother = mother

    this.mother.ux.on?.((event, payload) => this.heard(event, payload))

    // Si el padre ya tiene valor para este type, bajarlo
    if (parent && type && parent.resources.values[type] !== undefined) {
      this.pull({
        verb: 'changed',
        type,
        value: parent.resources.values[type],
      })
    }
  }

  /** Aviso de la carcasa → subir al Father del padre (si hay port). */
  protected heard(event: string, payload?: unknown): void {
    const type = this.port.input
    if (!type || !this.#emitToParent) return
    if (event === 'changed' || event === 'input') {
      this.#emitToParent({ verb: 'changed', type, value: payload })
    }
  }

  /** Trigger descendente: Resources avisó un changed de nuestro type. */
  protected pull(event: PrimitiveEvent): void {
    this.mother.ux.apply?.(event.value)
  }

  /** Relato que asciende desde este nivel (demo: log). */
  protected ascend(event: PrimitiveEvent): void {
    console.log('[ascend]', this.constructor.name, event)
  }
}
