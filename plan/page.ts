import type { Plan } from './index'

export const plan: Plan = {
  title: 'Página con layout',
  status: 'later',
  updated: '2026-11-26',
  why: '"Quiero que en page pueda tener un layout u otro. Y lo que va dentro de page ya hace una bifurcación con 2 modelos de datos: el de negocio y el de layout (menús, header, etc.)."',
  agreed: [
    'Hecho: `DemoApp` cerrado, con `AppContainer` (#app) → `RouterContainer` → página. El router filtra la receta al construir: las otras páginas nunca existen. Navegar es cargar otra URL.',
    'El layout tiene su propio lenguaje: loading, sending, show, disabled, enabled.',
  ],
  proposed: [],
  open: [
    'Cómo elige una página su layout.',
    'Los dos modelos de datos dentro de la página: ¿el de layout también se escribe con TypeParts? (toca la identidad de los niveles sin sustantivo, ver history)',
    'Navegar sin recargar necesita desmontar (ver core).',
    'Slots (ver catalog).',
  ],
  related: ['history', 'core', 'catalog'],
}
