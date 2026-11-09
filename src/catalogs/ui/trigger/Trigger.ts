import template from './Trigger.html?raw'
import { mountOnce } from '~/catalogs/element'
import {
  submittedEvent,
  type Changer,
  type Emit,
} from '~/catalogs/primitives/events'

/** Hoja ui.trigger.trigger — fuera de ui/input. */
export class Trigger extends HTMLElement implements Changer {
  static observedAttributes = ['label', 'type-name', 'name']

  #dom = { ready: false }
  #emit: Emit = () => {}
  #type = 'save'
  #label = 'submit'

  connect(emit: Emit) {
    this.#emit = emit
  }

  connectedCallback() {
    if (mountOnce(this, this.#dom, template)) this.#bind()
    this.#applyAttrs()
  }

  attributeChangedCallback() {
    if (this.#dom.ready) this.#applyAttrs()
  }

  #bind() {
    this.querySelector('[data-button]')?.addEventListener('click', () => {
      const event = submittedEvent(this.#type, this.#label)
      this.#emit(event)
    })
  }

  #applyAttrs() {
    this.#label =
      this.getAttribute('label') ?? this.getAttribute('name') ?? 'submit'
    this.#type = this.getAttribute('type-name') ?? 'save'
    const button = this.querySelector('[data-button]')
    if (button) {
      button.textContent = this.#label
      button.className = 'btn btn-success btn-sm'
    }
  }
}

customElements.define('ui-trigger', Trigger)
