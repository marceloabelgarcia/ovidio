import template from './App.html?raw'
import { defineCatalogElement } from '~/catalogs/element'

/** Cáscara UX de escenario (Edit, …) — igual que App.vue, no el layout de página. */
defineCatalogElement('ux-app', template, ['name', 'label'])
