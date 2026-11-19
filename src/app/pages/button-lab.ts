import { Page } from 'catalog/html/catalog/ux/page/'
import { StreetView } from 'catalog/html/demo/street-view'
import { Port } from 'core/types'
import { Widget } from 'core/widget'

/** Page de lab: mother = Page; hijo = StreetView. */
export class ButtonLabPage extends Widget {
  constructor(port: Port = {}) {
    super(new Page(), [{ child: StreetView }], port)
  }
}
