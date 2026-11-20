import { Container } from 'core/index'
import { Output, Port } from 'core/types'


export class HtmlContainer extends Container {
  /** Raíz visible del shell. */
  public readonly element: HTMLElement
  /** Nodo donde se montan los hijos (por defecto = element). */
  public readonly host: HTMLElement

  constructor(
    element: HTMLElement,
    children: Container[] = [],
    port: Port = {},
    host: HTMLElement = element,
  ) {
    // element/host deben existir antes de adoptar hijos
    super([], port)
    this.element = element
    this.host = host
    for (const child of children) {
      this.appendChild(child)
    }
  }

  /** Adopta hijo en el árbol y en el host DOM. */
  public override appendChild(child: Container): void {
    super.appendChild(child)
    if (child instanceof HtmlContainer) {
      this.host.appendChild(child.element)
    }
  }

  public dispatch(output: Output): void {
    output.event.target = this
    this.parent?.dispatched(output)
  }

}
