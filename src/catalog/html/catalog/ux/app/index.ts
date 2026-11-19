import { AppContainer } from './app-container'
import { ChildSpec, Widget } from 'core/widget'
import { Port } from 'core/types'

/**
 * App de catálogo: mother = AppContainer (#app), hueco listo para specs.
 */
export class App extends Widget {
  constructor(
    el: HTMLElement,
    children: ChildSpec[] = [],
    port: Port = {},
  ) {
    super(new AppContainer(el), children, port)
  }
}
