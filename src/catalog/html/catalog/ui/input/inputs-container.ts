import { HtmlContainer } from 'catalog/html/core/html-container'
import { Resource } from 'core/types'

/**
 * Mother del Input múltiple: reparte execute a cada InputContainer hijo.
 * (Father avisa a este shell, no a las hojas.)
 */
export class InputsContainer extends HtmlContainer {
  constructor() {
    const el = document.createElement('div')
    el.classList.add('inputs')
    super(el)
  }

  override execute(resource?: Resource): void {
    for (const child of this.children) {
      child.execute(resource)
    }
  }
}
