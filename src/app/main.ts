import './style.css'
import { Pages } from 'catalog/html/catalog/ux/page/'
import { ButtonLabPage } from './pages/button-lab'

const el = document.querySelector('#app') as HTMLElement | null
if (!el) throw new Error('#app no encontrado')

el.className = 'm-2 bg-gray-100 border border-black p-4 rounded-md'

new Pages(el, [
  { path: '/', page: ButtonLabPage },
  { path: '/button', page: ButtonLabPage },
])
