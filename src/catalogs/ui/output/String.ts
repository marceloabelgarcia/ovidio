import template from './String.html?raw'
import { mountOnce } from '~/catalogs/element'
import type { PrimitiveEvent, Worker } from '~/catalogs/primitives/events'

/** Hoja ui.output.string — badge; espera `changed`. */
export class StringOutput extends HTMLElement implements Worker {
  static observedAttributes = ['value', 'empty']

  #dom = { ready: false }

  readonly triggers = {
    changed: (event?: PrimitiveEvent) => {
      // Mismo predicado que el Input hermano (name, city, …).
      const mine = this.getAttribute('type-name') ?? this.getAttribute('name')
      if (event?.type != null && mine != null && event.type !== mine) return
      this.#paint(event?.value)
    },
  }

  connectedCallback() {
    mountOnce(this, this.#dom, template)
    this.#sync()
  }

  attributeChangedCallback() {
    if (this.#dom.ready) this.#sync()
  }

  #sync() {
    this.#paint(this.getAttribute('value') ?? this.getAttribute('empty') ?? '—')
  }

  #paint(value: unknown) {
    const el = this.querySelector('[data-value]')
    if (!el) return
    el.textContent =
      value === undefined || value === null || value === '' ? '—' : String(value)
  }
}

customElements.define('ui-output-string', StringOutput)
