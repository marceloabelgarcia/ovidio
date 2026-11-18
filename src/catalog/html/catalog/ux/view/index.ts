import { ViewContainer } from './view-container'
import { HtmlContainer } from 'catalog/html/core/html-container'
import { Port } from 'core/types'
import { Widget } from 'core/widget'

/**
 * View = Widget(ViewContainer) + hijos hoja.
 */
export class View extends Widget {
  constructor(
    children: HtmlContainer[] = [],
    port: Port = {},
  ) {
    super(new ViewContainer(), children, port)
  }
}
