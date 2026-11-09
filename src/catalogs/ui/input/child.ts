import type { EmitHandler } from './props-emits'

/**
 * Hijo del nivel (lógico).
 * Mother solo conoce esto — no sabe si pinta HTML o no.
 */
export type Child = {
  onEmit(handler: EmitHandler<Record<string, unknown>>): void
  setProps(patch: Record<string, unknown>): void
  /**
   * Si el hijo tiene vista HTML, el HtmlContainer la usa.
   * Un hijo sin vista (puro dato) no la implementa.
   */
  view?: HtmlChildView
}

/** Contrato mínimo que HtmlContainer sabe colocar. */
export type HtmlChildView = {
  render(into: HTMLElement): void
  dispose(): void
}
