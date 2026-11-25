import './style.css'
import { Demo } from 'catalog/html/demo/'
import { Port } from 'core/types'

/** Page de lab: mother = Page; hijo = StreetView. */
export class ButtonLabPage {
  constructor(port: Port = {}) {

    new Demo(document.querySelector('#app') as HTMLElement)
  }
}




const app = document.querySelector('#app')
if (!app) throw new Error('#app no encontrado')

const path = location.pathname.replace(/\/$/, '') || '/'

if (path === '/button' || path === '/') {
  new ButtonLabPage()
}
