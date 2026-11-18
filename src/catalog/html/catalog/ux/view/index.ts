import { ViewContainer } from './view-container'
import { Container } from 'core/container'
import { Port } from 'core/types'
import { Widget } from 'core/widget'

/**
 * Primitiva de vista: Widget cuyo mother es ViewContainer.
 *
 *   View (Widget)
 *     └── mother = ViewContainer
 *           └── children
 */
export class View extends Widget {
  constructor(
    children: Container[] = [],
    port: Port = {},
  ) {
    super(children, new ViewContainer(), port)
  }
}
