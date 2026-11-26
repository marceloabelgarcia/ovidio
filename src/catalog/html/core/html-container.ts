import { Mother } from 'core/mother'
import { Port } from 'core/types'

/** Realidad HTML: Element o Text. */
export type HtmlContent = HTMLElement | Text

/**
 * Mother HTML: ella misma es el host (element + append).
 */
export class HtmlContainer extends Mother {
  constructor(
    public readonly element: HtmlContent,
    port: Port = {},
  ) {
    super(port)
    this.bindRelations()
  }

  append(child: Mother): void {
    if (!(child instanceof HtmlContainer)) return
    if (this.element instanceof HTMLElement) {
      this.element.appendChild(child.element)
    }
  }
}
