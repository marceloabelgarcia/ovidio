import { HtmlContainer } from 'catalog/html/core/html-container'
import { Port } from 'core/types'

/** Panel genérico con host abierto + etiqueta. */
export class Panel extends HtmlContainer {
  constructor(label: string, className: string, port: Port = {}) {
    const el = document.createElement('div')
    el.className = className
    el.textContent = label
    super(el, port)
  }
}
