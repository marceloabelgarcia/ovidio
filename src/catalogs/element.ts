import { mountWithSlots } from '~/catalogs/ux/slot'

type AttrMap = Record<string, string | null>

export type CatalogElementApi = {
  mounted?: (host: HTMLElement) => void
  sync?: (host: HTMLElement, attrs: AttrMap) => void
}

/**
 * Define un CE de catálogo (cáscaras UX / hojas simples).
 * Abstrae template + observedAttributes del boilerplate DOM.
 */
export function defineCatalogElement(
  tag: string,
  template: string,
  observedAttributes: string[] = [],
  api: CatalogElementApi = {},
): CustomElementConstructor {
  class CatalogElement extends HTMLElement {
    static observedAttributes = observedAttributes
    #ready = false

    connectedCallback() {
      if (!this.#ready) {
        this.#ready = true
        if (template.trim()) mountWithSlots(this, template)
        api.mounted?.(this)
      }
      this.#sync()
    }

    attributeChangedCallback() {
      if (this.#ready) this.#sync()
    }

    #sync() {
      const attrs: AttrMap = {}
      for (const name of observedAttributes) {
        attrs[name] = this.getAttribute(name)
      }
      api.sync?.(this, attrs)
    }
  }

  if (!customElements.get(tag)) {
    customElements.define(tag, CatalogElement)
  }

  return customElements.get(tag)!
}

/** Monta template una sola vez — para hojas con Changer/Worker. */
export function mountOnce(
  host: HTMLElement,
  flag: { ready: boolean },
  template: string,
): boolean {
  if (flag.ready) return false
  flag.ready = true
  mountWithSlots(host, template)
  return true
}
