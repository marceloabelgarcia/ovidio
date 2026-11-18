import { ViewContainer } from './view-container'
import { Container } from 'core/container'
import { Port } from 'core/types'
import { Widget } from 'core/widget'

/**
 * View de catálogo: Widget con hueco vacío (ViewContainer).
 * Los hijos se alojan después al usarla como mother.
 */
export class View extends Widget {
  constructor(
    children: Container[] = [],
    port: Port = {},
  ) {
    super(children, new ViewContainer(), port)
  }
}
