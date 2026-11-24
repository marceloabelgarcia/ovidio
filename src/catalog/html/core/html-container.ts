import { Node } from 'core/node'

/** Realidad HTML: Element o Text. */
export type HtmlContent = HTMLElement | Text

/**
 * Realidad HTML: solo Node (append DOM). Sin dispatch.
 */
export class HtmlNode extends Node {
  constructor(public readonly element: HtmlContent) {
    super()
  }

  append(child: Node): void {

    if (!(child instanceof HtmlNode)) return
    // Solo un ParentNode (p. ej. HTMLElement) puede colgar hijos
    if (this.element instanceof HTMLElement) {
      this.element.appendChild(child.element)
    }
  }

}
