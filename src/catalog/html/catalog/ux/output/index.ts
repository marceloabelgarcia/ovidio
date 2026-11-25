import { HtmlNode, HtmlContent } from '../../../core/html-container'
import { Output, Port, TypePart } from 'core/types'

export class OutputContainer extends HtmlNode {
  /** Tipo que muestra (si port.input es TypePart); sin name muestra lo que llegue. */
  readonly name?: string

  constructor(port: Port = {}) {
    const input = port.input
    let output: HtmlContent
    let name: string | undefined

    if (typeof input === 'string') {
      output = document.createTextNode(input)
    } else if (input instanceof HTMLElement) {
      output = input
    } else if (input && typeof input === 'object' && 'name' in input) {
      name = (input as TypePart).name
      const el = document.createElement('output')
      el.name = name
      el.className = 'block min-h-10 px-3 py-2 border border-dashed border-neutral-400'
      output = el
    } else {
      output = document.createElement('div')
    }

    super(output, port)
    this.name = name
  }

  show(el: HTMLElement, content?: unknown): void {
    const text = content == null ? '' : String(content)
    if (el instanceof Text) {
      el.data = text
    } else {
      el.textContent = text
    }
  }

  /** Lee de la caja que llega y la proyecta al DOM (el DOM siempre guarda su propia copia). */
  execute(output: Output): void {
    const el = this.element
    if (!el) return
    if (this.name && output.resource?.type !== this.name) return
    this.show(el as HTMLElement, output.resource?.value)
  }
}
