import { HtmlContainer } from 'catalog/html/core/html-container'
import { Resource, TypePart } from 'core/types'

/**
 * Mother del Input múltiple: reparte execute a cada hijo.
 * Si port.input es un grupo TypePart, pela ese nivel antes de repartir.
 */
export class InputsContainer extends HtmlContainer {
  constructor() {
    const el = document.createElement('div')
    el.className = 'px-4 py-2'
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
