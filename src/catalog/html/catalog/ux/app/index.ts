import { AppContainer } from './app-container'
import { Container } from 'core/container'
import { Port } from 'core/types'
import { Widget } from 'core/widget'

/**
 * App de catálogo: Widget con hueco vacío (AppContainer).
 * Los hijos se alojan después al usarla como mother.
 */
export class App extends Widget {
  constructor(
    el: HTMLElement,
    children: Container[] = [],
    port: Port = {},
  ) {
    super(children, new AppContainer(el), port)
  }
}
