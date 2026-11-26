import { Port, TypePart, TriggerRelation, Action, Output } from 'core/types'
import { HtmlContainer } from '../../../core/html-container'
import { Widget } from 'core/widget'
import { actions } from '../../../core/types'

export const trigger = { action: actions.submit, state: 'finished' }

class InputContainer extends HtmlContainer {
  readonly name: string

  constructor(port: Port = {}) {
    const { name, type } = port.input as TypePart
    const input = document.createElement('input')
    input.className = 'input'
    input.type = type as string

    super(input, port)
    this.name = name
  }

  /** Escucha la acción del DOM y la cuenta conjugada: el valor cambió → 'changed'. El jefe la traduce. */
  protected listen(action: Action): void {
    const el = this.element as HTMLInputElement
    el.addEventListener(action.verb, () => {
      const widget = this.widget
      if (!widget) return
      widget.set(this.name, el.value) // muta la caja: la fuente única
      // siempre la misma caja, nunca un objeto nuevo
      this.emit({ action, state: 'finished' }, widget.ref(this.name))
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
    // un solo port para el jefe y su lugar: el lugar escucha 'change' y lo cuenta 'changed'; el jefe lo avisa igual
    const relations: TriggerRelation[] = [
      {
        trigger: { action: actions.change, state: 'finished' },
        triggers: [
          { action: actions.change, state: 'finished' },
          // { action: actions.input, state: 'finished' },
        ],
      },
      ...(port.relations ?? []),
    ]
    const own = { ...port, relations }
    const mother = new InputContainer(own)

    super(mother, [], own)

    if (name) {
      this.set(name, (mother.element as HTMLInputElement).value)
    }
  }
}
