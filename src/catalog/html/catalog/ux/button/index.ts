import { HtmlNode } from '../../../core/html-container'
import { Port, Action } from 'core/types'

export class ButtonContainer extends HtmlNode {
  constructor(port: Port = {}) {
    const button = document.createElement('button')
    button.textContent = 'Click me'
    button.className = 'btn btn-primary'

    super(button, port)
  }

  /** Escucha la acción del DOM y la avisa en crudo ('click'); el jefe la traduce. */
  protected listen(action: Action): void {
    const el = this.element as HTMLButtonElement
    el.addEventListener(action.verb, ($event) => {
      this.emit({ action, state: 'verb' }, { type: 'button', value: $event.target })
    })
  }
}
