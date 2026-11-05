import template from './card.html?raw';
import { mountWithSlots } from '../slot';

/**
 * Props no reactivas: se aplican al montar o con applyProps().
 * Mutar attributes no re-pinta solo.
 */
export class UiCard extends HTMLElement {
  static observedAttributes = ['title', 'badge'];

  #mounted = false;

  connectedCallback() {
    if (this.#mounted) return;
    this.#mounted = true;
    mountWithSlots(this, template);
    this.applyProps();

    this.querySelector('[data-action]')?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('card-action', { bubbles: true }));
    });
  }

  applyProps() {
    const titleEl = this.querySelector('[data-title]');
    const badgeEl = this.querySelector('[data-badge]');
    if (!titleEl || !badgeEl) return;

    titleEl.textContent = this.getAttribute('title') ?? '';

    const badge = this.getAttribute('badge');
    if (badge) {
      badgeEl.textContent = badge;
      badgeEl.classList.remove('hidden');
    } else {
      badgeEl.textContent = '';
      badgeEl.classList.add('hidden');
    }
  }
}

customElements.define('ui-card', UiCard);

declare global {
  interface HTMLElementTagNameMap {
    'ui-card': UiCard;
  }
}
