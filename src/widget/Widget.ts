import type { NodeWidget } from '~/catalogs/widgets'
import type { Emit } from '~/catalogs/primitives/events'

import { Father } from './Father'
import { Resources } from './Resources'
import { Mother } from './Mother'
import { mountChild } from './child/Child'

/**
 * Equivalente a Widget.vue — misma responsabilidad.
 * Nivel: Mother + Children; Father/Resources del nivel.
 */
export class Widget extends HTMLElement {
  widget: NodeWidget = { children: [] }
  value?: unknown
  port?: { input: string; output: string; trigger: string }

  /** Father del nivel padre (emitUp). */
  parentFather?: Father
  /**
   * Resources de primos (p.ej. Fields): Input/Output fromType registran Output ahí.
   * Form/Actions/App reinician el alcance; Field lo hereda.
   */
  scope?: Resources

  #ready = false
  #father?: Father

  connectedCallback() {
    if (this.#ready) return
    this.#ready = true
    this.#mount()
  }

  disconnectedCallback() {
    if (this.#father) this.#father = undefined
  }

  #mount() {
    const local = new Resources(this.widget.children ?? [])
    const levelType = this.port?.input ?? this.widget.port?.input

    const emitUp: Emit | undefined = this.parentFather
      ? (event) => this.parentFather!.receive(event)
      : (event) => {
          this.dispatchEvent(
            new CustomEvent('dispatch', { detail: event, bubbles: true }),
          )
        }

    this.#father = new Father(local, emitUp, levelType)

    // Solo Form/Actions/App reinician el alcance de primos (Input↔Output, Trigger↔Fetch).
    // Field es cáscara visual: hereda el scope (p.ej. el Form de Fields).
    const childScope = isScopeRoot(this.widget.container)
      ? local
      : (this.scope ?? local)

    const childNodes = (this.widget.children ?? []).map((child, index) => {
      const host = document.createElement('div')
      host.dataset.childIndex = String(index)
      mountChild(host, {
        widget: child,
        value: valueOf(this.widget, this.value, child),
        port: this.port,
        father: this.#father!,
        scope: childScope,
      })
      return host
    })

    Mother(
      this,
      {
        container: this.widget.container,
        params: { label: this.widget.port?.input },
      },
      childNodes,
    )

    const dbg = document.createElement('div')
    dbg.textContent = `${this.port?.input ?? ''} - ${this.port?.trigger ?? ''}`
    this.querySelector('.space-y-2')?.prepend(dbg)
  }
}

/** Contenedores que agrupan hermanos/primos y abren Resources propio. */
function isScopeRoot(container?: string): boolean {
  return container === 'Form' || container === 'Actions' || container === 'App'
}

function valueOf(
  widget: NodeWidget,
  value: unknown,
  child: NodeWidget,
): unknown {
  const childInput = child.port?.input

  if (
    (!child.template && !child.children?.length) ||
    childInput === widget.port?.input
  ) {
    return value
  }

  if (childInput === undefined || typeof value !== 'object' || value === null) {
    return undefined
  }

  return (value as Record<string, unknown>)[childInput]
}

customElements.define('widget-node', Widget)

declare global {
  interface HTMLElementTagNameMap {
    'widget-node': Widget
  }
}
