import { Port, TypePart, TriggerRelation, Action, Output } from 'core/types'
import { HtmlNode } from '../../../core/html-container'
import { Widget } from 'core/widget'
import { actions } from '../../../core/types'

export const trigger = { action: actions.submit, state: 'finished' }

class InputContainer extends HtmlNode {
  readonly name: string

  constructor(port: Port = {}) {
    const { name, type } = port.input as TypePart
    const input = document.createElement('input')
    input.className = 'input'
    input.type = type as string

    super(input, port)
    this.name = name
  }

  protected addListeners(action: Action, relation: TriggerRelation): void {
    const el = this.element as HTMLInputElement
    el.addEventListener(action.verb, () => {
      const widget = this.widget
      if (!widget) return
      widget.set(this.name, el.value) // muta la caja: la fuente única
      widget.dispatched({
        event: {
          trigger: relation.trigger,
          time: new Date(),
          target: el,
        },
        resource: widget.ref(this.name), // siempre la misma caja, nunca un objeto nuevo
      })
    })
  }

  /**
   * Un hermano emitió el trigger que espero. Este input también es primitiva
   * (tiene su propia caja), así que copia el valor: al DOM y a su caja.
   */
  execute(output: Output): void {
    const ref = output.resource
    if (ref?.type !== this.name) return
    const el = this.element as HTMLInputElement
    el.value = ref.value == null ? '' : String(ref.value)
    this.widget?.set(this.name, el.value)
  }
}

export class Input extends Widget {
  constructor(port: Port = {}) {
    const { name } = (port.input as TypePart) ?? {}
    const mother = new InputContainer({
      ...port,
      relations: [
        {
          trigger: { action: actions.change, state: 'finished' },
          triggers: [
            actions.change,
            // actions.input
          ],
        },
      ],
    })

    super(mother, [], port)

    if (name) {
      this.set(name, (mother.element as HTMLInputElement).value)
    }
  }
}
