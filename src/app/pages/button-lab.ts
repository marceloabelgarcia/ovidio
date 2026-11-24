
import { Demo } from 'catalog/html/demo/'
import { Port } from 'core/types'

/** Page de lab: mother = Page; hijo = StreetView. */
export class ButtonLabPage  {
  constructor(port: Port = {}) {

    new Demo(document.querySelector('#app') as HTMLElement)
  }
}
