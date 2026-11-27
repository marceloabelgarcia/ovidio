import { HtmlContainer } from 'catalog/html/core/html-container'
import { Port } from 'core/types'

/** Host del contenido central (abierto). */
export class ContentContainer extends HtmlContainer {
  constructor(port: Port = {}) {
    const el = document.createElement('div')
    el.className = 'flex flex-col gap-2 p-2 flex-1 border border-red-500'
    super(el, port)
  }
}
