import { HtmlContainer } from 'catalog/html/core/html-container'
import { Port } from 'core/types'

/** Host fila: hijos en horizontal. */
export class Row extends HtmlContainer {
  constructor(port: Port = {}) {
    const el = document.createElement('div')
    el.className = 'flex flex-row gap-2 p-2 flex-1 border border-blue-500'
    super(el, port)
  }
}
