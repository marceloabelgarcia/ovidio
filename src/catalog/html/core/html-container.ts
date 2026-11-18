import { Container } from 'core/container'
import { Port, Resource } from 'core/types'

/**
 * Container + DOM. Sin Father: solo representación y eventos → dispatch.
 */
export class HtmlContainer extends Container {
  public readonly element: HTMLElement
  /** Contrato de la hoja (input/trigger); el del nivel vive en Father. */
  public port: Port = {}

  constructor(
    element: HTMLElement,
    children: Container[] = [],
    port: Port = {},
  ) {
    super([])
    this.element = element
    this.port = port
    for (const child of children) {
      this.appendChild(child)
    }
  }

  public override appendChild(child: Container): void {
    super.appendChild(child)
    if (child instanceof HtmlContainer) {
      this.element.appendChild(child.element)
    }
  }

  /** Las hojas (Display, etc.) lo overridean. */
  execute(_resource?: Resource): void {}
}
