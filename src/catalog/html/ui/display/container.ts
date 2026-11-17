import { HtmlContainer } from 'catalog/html/core/html-container'
import { Port, Resource } from 'core/types'

/** Hoja Container: usable como hijo en cualquier lado. */
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
    this.show(resource?.value as string | HTMLElement | undefined)
  }


  show(content?: string | HTMLElement): void {
    this.element.innerHTML = ''
    if (content == null) return

    if (typeof content === 'string') {
      this.element.textContent = content
    } else {
      this.element.appendChild(content)
    }
  }
}
