import { Container } from './container'
import { Father } from './father'
import { Port } from './types'

/**
 * Unidad lógica: reúne Container (dónde vive) + Father (cómo fluye).
 *
 *   Widget
 *     ├── container  → árbol físico
 *     └── father     → port / resources / dispatched
 */
export class Widget {
  public readonly container: Container
  public readonly father: Father

  constructor(
    container: Container,
    children: Container[] = [],
    port: Port = {},
  ) {
    this.container = container
    this.father = new Father(port, this.container)

    this.container.setDispatch((output) => {
      this.father.dispatched(output)
    })

    for (const child of children) {
      this.append(child)
    }
  }

  public append(child: Container): void {
    this.container.appendChild(child)
  }

  /** Anida otro Widget: container físico + Father padre/hijo. */
  public appendWidget(child: Widget): void {
    this.container.appendChild(child.container)
    child.father.parent = this.father
  }
}
