import { HtmlNode } from '../../../core/html-container'
import type { Children } from 'core/mother'
import type { Widget } from 'core/widget'
import { Port } from 'core/types'

/**
 * Realidad de la URL: lee el path y monta solo el hijo que le corresponde.
 * Cada hijo de la receta dice su ruta en port.input ('/', '/http', …).
 * Sin coincidencia no se monta nada. Navegar = cargar otra URL (no hay desmontar).
 */
export class RouterContainer extends HtmlNode {
  private readonly path = location.pathname.replace(/\/$/, '') || '/'

  constructor(port: Port = {}) {
    const el = document.createElement('div')
    el.className = 'contents' // no agrega una caja al layout
    super(el, port)
  }

  /** Filtra la receta antes de construirla: las otras páginas nunca existen. */
  appendChildren(children: Children): Widget[] {
    const route = children.find(({ port }) => port?.input === this.path)
    if (!route) console.warn(`router: ninguna página para '${this.path}'`)
    return super.appendChildren(route ? [route] : [])
  }
}
