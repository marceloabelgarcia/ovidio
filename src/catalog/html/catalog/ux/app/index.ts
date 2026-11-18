import { AppContainer } from './app-container'
import { HtmlContainer } from 'catalog/html/core/html-container'
import { Port } from 'core/types'
import { Widget } from 'core/widget'

/**
 * App = Widget(AppContainer) — raíz HTML del runtime.
 */
export class App extends Widget {
  constructor(
    el: HTMLElement,
    children: HtmlContainer[] = [],
    port: Port = {},
  ) {
    super(new AppContainer(el), children, port)
  }
}
