import { ViewContainer } from './view-container'
import { ChildSpec, Widget } from 'core/widget'
import { Port } from 'core/types'

/**
 * View de catálogo: mother = ViewContainer, hueco listo para specs.
 */
export class View extends Widget {
  constructor(
    children: ChildSpec[] = [],
    port: Port = {},
  ) {
    super(new ViewContainer(), children, port)
  }
}
