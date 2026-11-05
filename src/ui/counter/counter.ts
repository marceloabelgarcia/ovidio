import template from './counter.html?raw';
import { signal } from '../../lib/bind';
import { mountWithSlots } from '../../ux/slot';

export class UiCounter extends HTMLElement {
  #domReady = false;
  #unsub?: () => void;
  #count = signal(0);

  connectedCallback() {
    if (!this.#domReady) {
      this.#domReady = true;
      mountWithSlots(this, template);

      this.querySelector('[data-inc]')?.addEventListener('click', () => {
        this.#count.set(this.#count.get() + 1);
      });
    }

    const countEl = this.querySelector('[data-count]');
    if (!countEl) return;

    this.#unsub = this.#count.subscribe((value) => {
      countEl.textContent = String(value);
    });
  }

  disconnectedCallback() {
    this.#unsub?.();
    this.#unsub = undefined;
  }
}

customElements.define('ui-counter', UiCounter);

declare global {
  interface HTMLElementTagNameMap {
    'ui-counter': UiCounter;
  }
}
