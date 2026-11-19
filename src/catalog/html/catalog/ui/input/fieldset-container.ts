import { HtmlContainer } from 'catalog/html/core/html-container'
import { Resource, TypePart } from 'core/types'

/**
 * Mother del Input múltiple: reparte execute a cada hijo.
 * Si port.input es un grupo TypePart, pela ese nivel antes de repartir.
 */
export class FieldsetContainer extends HtmlContainer {
  constructor() {
    const el = document.createElement('fieldset')
    el.className = 'fieldset'
    const legend = document.createElement('legend')
    legend.textContent = 'fieldset-legend'
    el.appendChild(legend)
    const p = document.createElement('p')
    p.textContent = 'You can edit page title later on from settings'
    p.className = 'label'
    el.appendChild(p)
    super(el)
  }

  override execute(resource?: Resource): void {
    let next = resource
    const input = this.port.input

    if (
      next?.value &&
      typeof next.value === 'object' &&
      !Array.isArray(next.value) &&
      input &&
      typeof input === 'object' &&
      !Array.isArray(input) &&
      'name' in input
    ) {
      const key = (input as TypePart).name
      next = {
        type: key,
        value: (next.value as Record<string, unknown>)[key],
      }
    }

    for (const child of this.children) {
      child.execute(next)
    }
  }
}
