import template from './section.html?raw';
import { mountWithSlots } from '../slot';

export class UiSection extends HTMLElement {
  static observedAttributes = ['title', 'description'];

  #mounted = false;

  connectedCallback() {
    if (this.#mounted) return;
    this.#mounted = true;
    mountWithSlots(this, template);
    this.applyProps();
  }

  applyProps() {
    const title = this.querySelector('[data-title]');
    const description = this.querySelector('[data-description]');
    if (title) title.textContent = this.getAttribute('title') ?? '';
    if (description) {
      description.textContent = this.getAttribute('description') ?? '';
      description.classList.toggle('hidden', !this.getAttribute('description'));
    }
  }
}

customElements.define('ui-section', UiSection);

declare global {
  interface HTMLElementTagNameMap {
    'ui-section': UiSection;
  }
}
