import template from './Field.html?raw'
import { defineCatalogElement } from '~/catalogs/element'

defineCatalogElement('ux-field', template, ['label', 'name'], {
  sync(host, attrs) {
    const label = attrs.label ?? attrs.name ?? ''
    const el = host.querySelector('[data-label]')
    if (el) el.textContent = label
  },
})
