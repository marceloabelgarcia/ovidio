import template from './Fetch.html?raw'
import { mountOnce } from '~/catalogs/element'
import {
  subjects,
  type Changer,
  type Emit,
  type PrimitiveEvent,
  type Worker,
} from '~/catalogs/primitives/events'

/** Obrero work.fetch. */
export class Fetch extends HTMLElement implements Worker, Changer {
  static observedAttributes = ['type-name', 'name']

  #dom = { ready: false }
  #emit: Emit = () => {}
  #type = 'address'

  readonly triggers = {
    submitted: async (event?: PrimitiveEvent) => {
      this.#paint('sending')
      await wait(400)
      this.#paint('sended')
      const saved = {
        subject: subjects.fetch,
        verb: 'saved',
        type: event?.type ?? this.#type,
        value: event?.value ?? true,
      }
      this.#emit(saved)
      this.dispatchEvent(
        new CustomEvent('dispatch', { detail: saved, bubbles: true }),
      )
      this.#paint('saved')
    },
  }

  connect(emit: Emit) {
    this.#emit = emit
  }

  connectedCallback() {
    mountOnce(this, this.#dom, template)
    this.#type = this.getAttribute('type-name') ?? 'address'
  }

  #paint(status: string) {
    const el = this.querySelector('[data-status]')
    if (el) el.textContent = status
  }
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms)
  })
}

customElements.define('work-fetch', Fetch)
