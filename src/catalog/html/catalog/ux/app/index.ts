import { AppContainer } from './app-container'
import { Container } from 'core/container'
import { Port } from 'core/types'
import { Widget } from 'core/widget'

/**
 * Primitiva raíz HTML: Widget cuyo mother es AppContainer (#app → runtime).
 *
 *   App (Widget)
 *     └── mother = AppContainer
 *           └── children
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
