import { HtmlContainer } from 'catalog/html/core/html-container'
import { Port, Resource } from 'core/types'

/** Shell DOM del Display (primitiva). */
export class DisplayContainer extends HtmlContainer {
  constructor(
    port: Port = { input: 'name' },
    content?: HTMLElement | string,
  ) {
    const display = document.createElement('div')
    display.className = 'border border-gray-300 rounded-md p-2 h-20'

    const initial = content ?? 'HOLA MUNDO'
    if (typeof initial === 'string') {
      display.textContent = initial
    } else {
      display.appendChild(initial)
    }

    super(display, [], port)
  }

  override execute(resource?: Resource): void {
    this.show(resource?.value)
  }

  show(content?: unknown): void {
    this.element.innerHTML = ''
    if (content == null) return

    if (typeof content === 'string') {
      this.element.textContent = content
      return
    }

    if (content instanceof HTMLElement) {
      this.element.appendChild(content)
      return
    }

    // Compuesto u otros valores: no hacer appendChild (rompe el forEach de brothers)
    this.element.textContent = JSON.stringify(content)
  }
}
