import { Mother } from 'core/mother'
import { Node } from 'core/node'
import { Port } from 'core/types'

/** Realidad HTML: Element o Text. */
export type HtmlContent = HTMLElement | Text

/**
 * Mother HTML: ella misma es el host (element + append).
 */
export class HtmlNode extends Mother {
  constructor(
    public readonly element: HtmlContent,
    port: Port = {},
  ) {
    super(port)
    this.bindRelations()
  }

  append(child: Node): void {
    if (!(child instanceof HtmlNode)) return
    if (this.element instanceof HTMLElement) {
      this.element.appendChild(child.element)
    }
  }
}
