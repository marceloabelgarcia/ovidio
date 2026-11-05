import './style.css';
import './ux';
import './ui';
import { HomePage } from './pages/home';

const app = document.querySelector('#app');
if (!app) throw new Error('#app no encontrado');

app.replaceChildren(HomePage());
