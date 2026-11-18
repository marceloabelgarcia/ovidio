import { Container } from 'core/index'
import { Output, Port } from 'core/types'


export class HtmlContainer extends Container {
  public readonly element: HTMLElement

  constructor(
    element: HTMLElement,
    children: Container[] = [],
    port: Port = {},
  ) {
    // element debe existir antes de adoptar hijos (super no puede montar aún)
    super([], port)
    this.element = element
    for (const child of children) {
      this.appendChild(child)
    }
  }

  /** Adopta hijo en el árbol y en el DOM. */
  public override appendChild(child: Container): void {
    super.appendChild(child)
    if (child instanceof HtmlContainer) {
      this.element.appendChild(child.element)
    }
  }

  public dispatch(output: Output): void {
    this.parent?.dispatched(output)
  }

}
