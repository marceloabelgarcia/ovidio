import './style.css'
import { ButtonLabPage } from './pages/button-lab'

const app = document.querySelector('#app')
if (!app) throw new Error('#app no encontrado')

const path = location.pathname.replace(/\/$/, '') || '/'

if (path === '/button') {
  ButtonLabPage()
} 