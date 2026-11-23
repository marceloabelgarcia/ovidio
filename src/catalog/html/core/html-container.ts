import { Node } from 'core/node'


/**
 * Realidad HTML: solo Node (append DOM). Sin dispatch.
 */
export class HtmlNode extends Node {
  constructor(public readonly element: HTMLElement) {
    super()
  }

  append(child: Node): void {
    if (child instanceof HtmlNode) {
      this.element.appendChild(child.element)
    }
  }
}
