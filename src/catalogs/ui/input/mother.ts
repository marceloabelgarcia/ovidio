import type { Emit, PrimitiveEvent } from '~/catalogs/primitives/events'
import type { Child } from './child'
import type { UxContainer } from './container'

/**
 * Mother: dispone hijos en un contenedor UX y canaliza emits.
 * No crea HTML. No conoce Resources ni Father.
 */
export class Mother {
  #onChildEmit?: Emit
  #container: UxContainer | null = null
  #children: Child[] = []

  /** Widget: Mother → Resources.receive */
  onChildEmit(handler: Emit): void {
    this.#onChildEmit = handler
  }

  /**
   * Enlaza contenedor + hijos.
   * El contenedor (HtmlContainer u otro) sabe cómo colocarlos.
   */
  bind(container: UxContainer, children: Child[]): void {
    this.dispose()
    this.#container = container
    this.#children = children

    for (const child of children) {
      child.onEmit((_name, payload) => {
        if (isPrimitiveEvent(payload)) this.#onChildEmit?.(payload)
      })
      container.place(child)
    }
  }

  patch(props: Record<string, unknown>): void {
    for (const child of this.#children) child.setProps(props)
  }

  dispose(): void {
    this.#container?.clear()
    this.#container = null
    this.#children = []
  }
}

function isPrimitiveEvent(value: unknown): value is PrimitiveEvent {
  return (
    typeof value === 'object' &&
    value != null &&
    'verb' in value &&
    'subject' in value
  )
}
