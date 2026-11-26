import { HtmlContainer } from '../../../core/html-container'
import { Port, Action } from 'core/types'

export class ButtonContainer extends HtmlContainer {
  constructor(port: Port = {}) {
    const button = document.createElement('button')
    button.textContent = 'Click me'
    button.className = 'btn btn-primary'

    super(button, port)
  }

  /** Escucha la acción del DOM y la cuenta conjugada: el click pasó → 'released'. El jefe la traduce. */
  protected sense(action: Action): void {
    const el = this.element as HTMLButtonElement
    el.addEventListener(action.verb, ($event) => {
      // pendiente (etapa catálogos): el valor es un elemento del DOM, la realidad viajando
      // dentro de la cadena; y 'button' no es un TypePart
      this.emit({ action, state: 'finished' }, { type: 'button', value: $event.target })
    })
  }
}
