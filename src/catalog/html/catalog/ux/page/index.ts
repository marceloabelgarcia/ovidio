import { PageContainer } from './page-container'
import { PagesContainer } from './pages-container'
import { PageRoute, RouteContainer } from './route-container'
import { Port } from 'core/types'
import { ChildSpec, Widget } from 'core/widget'

/** Page: solo declara mother + hijos. */
export class Page extends Widget {
  constructor(
    children: ChildSpec[] = [],
    port: Port = {},
  ) {
    super(new PageContainer(), children, port)
  }
}

/** Pages: solo declara; la ruta activa sale de RouteContainer. */
export class Pages extends Widget {
  constructor(
    el: HTMLElement,
    routes: PageRoute[] = [],
    port: Port = {},
  ) {
    super(new PagesContainer(el), new RouteContainer(routes).active, port)
  }
}

export { PageContainer } from './page-container'
export { PagesContainer } from './pages-container'
export { RouteContainer } from './route-container'
export type { PageRoute } from './route-container'
