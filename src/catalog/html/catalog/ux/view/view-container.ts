import { HtmlContainer } from '../../../core/html-container'
import { Resource, TypePart } from 'core/types'

/** Shell HTML de una View (div por defecto). */
export class ViewContainer extends HtmlContainer {
  constructor(el: HTMLElement = document.createElement('div')) {
    el.className = 'border border-red-500 p-2 rounded-md m-2'
    super(el)
  }

  /**
   * Reparte execute a los hijos.
   * Si port.input es grupo TypePart, pela ese nivel (Input anidado).
   */
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
