import { HtmlContainer } from 'catalog/html/core/html-container'
import { Port } from 'core/types'

/** Host columna: hijos uno debajo de otro. */
export class Col extends HtmlContainer {
  constructor(port: Port = {}) {
    const el = document.createElement('div')
    el.className = 'flex flex-col gap-2 p-2 min-h-screen border border-black'
    super(el, port)
  }
}
