import { HtmlContainer } from '../../../core/html-container'
import { ChildCtor, ChildSpec } from 'core/widget'

export type PageRoute = {
  path: string
  page: ChildCtor
}

/**
 * Container HTML que resuelve la page activa según location.pathname.
 * Aquí vive la lógica de rutas (no en el Widget).
 */
export class RouteContainer extends HtmlContainer {
  readonly active: ChildSpec[]

  constructor(routes: PageRoute[] = []) {
    const el = document.createElement('div')
    el.classList.add('route')
    super(el)

    const path = location.pathname.replace(/\/$/, '') || '/'
    const route =
      routes.find((r) => r.path === path) ??
      routes.find((r) => r.path === '/')

    this.active = route ? [{ child: route.page }] : []
  }
}
