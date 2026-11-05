import template from './echo-field.html?raw';
import { mountWithSlots } from '../../ux/slot';

export class UiEchoField extends HTMLElement {
  #mounted = false;

  connectedCallback() {
    if (this.#mounted) return;
    this.#mounted = true;
    mountWithSlots(this, template);

    const label = this.getAttribute('label') ?? '';
    const placeholder = this.getAttribute('placeholder') ?? '';

    const labelEl = this.querySelector('[data-label]');
    const input = this.querySelector('[data-input]') as HTMLInputElement | null;
    const echo = this.querySelector('[data-echo]');

    if (labelEl) labelEl.textContent = label;
    if (input) {
      input.placeholder = placeholder;
      input.addEventListener('input', () => {
        if (echo) echo.textContent = input.value;
      });
    }
  }
}

customElements.define('ui-echo-field', UiEchoField);

declare global {
  interface HTMLElementTagNameMap {
    'ui-echo-field': UiEchoField;
  }
}
