import type { Emit } from '~/catalogs/primitives/events'
import type { Child } from './child'
import { HtmlContainer } from './html-container'
import { InputUx } from './ux'
import { Widget } from './widget'

const observedAttributes = [
  'placeholder',
  'value',
  'type-name',
  'type',
  'name',
  'label',
] as const

/** Nivel ui.input: hijos lógicos; el CE aporta el HtmlContainer. */
export class InputLevel extends Widget {
  #ux: InputUx

  constructor(props: ConstructorParameters<typeof InputUx>[0] = {}) {
    super()
    this.#ux = new InputUx(props)
  }

  protected levelType(): string {
    return 'ui.input'
  }

  protected createChildren(): Child[] {
    return [this.#ux]
  }

  applyHostProps(attrs: {
    type?: string | null
    name?: string | null
    value?: string | null
    placeholder?: string | null
    predicate?: string | null
  }): void {
    this.patch({
      type: attrs.type ?? 'text',
      name: attrs.name ?? '',
      value: attrs.value ?? '',
      placeholder: attrs.placeholder ?? '',
      predicate: attrs.predicate ?? 'string',
    })
  }
}

/**
 * Custom Element: único lugar que conoce el host DOM del catálogo.
 * Crea HtmlContainer y lo entrega al nivel.
 */
export class Input extends HTMLElement {
  static observedAttributes = [...observedAttributes]

  readonly level = new InputLevel()
  #ready = false
  #container: HtmlContainer | null = null

  get resources() {
    return this.level.resources
  }

  connect(emit: Emit) {
    this.level.connect(emit)
  }

  connectedCallback() {
    if (this.#ready) return
    this.#ready = true
    this.level.applyHostProps(this.#attrs())
    this.#container = new HtmlContainer(this)
    this.level.bind(this.#container)
  }

  disconnectedCallback() {
    this.level.dispose()
    this.#container = null
  }

  attributeChangedCallback(
    _name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (!this.#ready || oldValue === newValue) return
    this.level.applyHostProps(this.#attrs())
  }

  #attrs() {
    return {
      type: this.getAttribute('type'),
      name: this.getAttribute('name'),
      value: this.getAttribute('value'),
      placeholder: this.getAttribute('placeholder'),
      predicate:
        this.getAttribute('type-name') ??
        this.getAttribute('name') ??
        this.getAttribute('label'),
    }
  }
}

customElements.define('ui-input', Input)

declare global {
  interface HTMLElementTagNameMap {
    'ui-input': Input
  }
}
