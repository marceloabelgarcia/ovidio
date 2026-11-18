import { ViewContainer } from './view-container'
import { Container } from 'core/index'
import { Port } from 'core/types'
import { Widget } from 'core/index'

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
