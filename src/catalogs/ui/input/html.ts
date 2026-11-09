import type { HtmlChildView } from './child'
import { Unit } from './props-emits'

/**
 * Vista HTML de una Unit.
 * Responsabilidad DOM del hijo — Mother / Widget no la ven.
 */
export abstract class HtmlView<
  Props extends Record<string, unknown> = Record<string, unknown>,
  Events extends Record<string, unknown> = Record<string, unknown>,
>
  extends Unit<Props, Events>
  implements HtmlChildView
{
  protected abstract readonly template: string

  #root: HTMLElement | null = null
  #cleanup: (() => void) | undefined

  /** Para que HtmlContainer pueda colocar este hijo. */
  get view(): HtmlChildView {
    return this
  }

  render(into: HTMLElement): void {
    this.dispose()
    this.#root = into
    into.innerHTML = this.template.trim()
    this.#cleanup = this.bind(into)
    this.paint(into)
  }

  dispose(): void {
    this.#cleanup?.()
    this.#cleanup = undefined
    this.#root?.replaceChildren()
    this.#root = null
  }

  protected override propsChanged(): void {
    if (this.#root) this.paint(this.#root)
  }

  protected abstract bind(root: HTMLElement): () => void
  protected abstract paint(root: HTMLElement): void
}
