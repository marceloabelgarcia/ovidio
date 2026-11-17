import { Container } from 'core/container'
import { Port } from 'core/types'


export class HtmlContainer extends Container {
  constructor(
    public readonly element: HTMLElement,
    children: Container[] = [],
    port: Port = {},
  ) {
    super(children, port)
  }

  /** Adopta hijo en el árbol y en el DOM. */
  public override appendChild(child: Container): void {
    super.appendChild(child)
    if (child instanceof HtmlContainer) {
      this.element.appendChild(child.element)
    }
  }

}

