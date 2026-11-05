import template from './clock.html?raw';
import { bindText, signal } from '../../lib/bind';
import { mountWithSlots } from '../../ux/slot';

export class UiClock extends HTMLElement {
  #domReady = false;
  #stop?: () => void;
  #unsub?: () => void;
  #time = signal('--:--:--');

  connectedCallback() {
    // El template solo una vez; el tick se reinicia en cada connect
    // (los slots del padre pueden desconectar/reconnectar el nodo).
    if (!this.#domReady) {
      this.#domReady = true;
      mountWithSlots(this, template);
    }

    const timeEl = this.querySelector('[data-time]');
    if (!timeEl) return;

    this.#unsub = bindText(timeEl, this.#time);

    const tick = () => {
      this.#time.set(new Date().toLocaleTimeString('es-ES'));
    };
    tick();
    const id = window.setInterval(tick, 1000);
    this.#stop = () => window.clearInterval(id);
  }

  disconnectedCallback() {
    this.#stop?.();
    this.#stop = undefined;
    this.#unsub?.();
    this.#unsub = undefined;
  }
}

customElements.define('ui-clock', UiClock);

declare global {
  interface HTMLElementTagNameMap {
    'ui-clock': UiClock;
  }
}
