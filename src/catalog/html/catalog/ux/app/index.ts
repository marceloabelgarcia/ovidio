import { HtmlNode } from '../../../core/html-container'
import { Port } from 'core/types'

/** La primitiva fija: el #app del documento, donde vive todo el árbol. */
export class AppContainer extends HtmlNode {
  constructor(port: Port = {}) {
    const el = document.querySelector<HTMLElement>('#app')
    if (!el) throw new Error('#app no encontrado')
    super(el, port)
  }
}
