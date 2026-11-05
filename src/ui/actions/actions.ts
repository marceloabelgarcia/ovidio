import template from './actions.html?raw';
import { mountWithSlots } from '../../ux/slot';

export class UiActions extends HTMLElement {
  #mounted = false;

  connectedCallback() {
    if (this.#mounted) return;
    this.#mounted = true;
    mountWithSlots(this, template);
  }

  setNote(text: string) {
    const note = this.querySelector('[data-note]');
    if (note) note.textContent = text;
  }
}

customElements.define('ui-actions', UiActions);

declare global {
  interface HTMLElementTagNameMap {
    'ui-actions': UiActions;
  }
}
