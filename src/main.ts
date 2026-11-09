import './style.css'
import '~/catalogs'
import '~/widget/Widget'
import { HomePage } from './pages/home'
import { InputLabPage } from './pages/input-lab'
import { ButtonLabPage } from './pages/button-lab'

const app = document.querySelector('#app')
if (!app) throw new Error('#app no encontrado')

const path = location.pathname.replace(/\/$/, '') || '/'

if (path === '/button') {
  ButtonLabPage()
} else if (path === '/input') {
  app.replaceChildren(InputLabPage())
} else {
  app.replaceChildren(HomePage())
}
