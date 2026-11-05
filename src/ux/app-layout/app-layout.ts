import template from './app-layout.html?raw';
import { defineLayout } from '../slot';

defineLayout('app-layout', template);

declare global {
  interface HTMLElementTagNameMap {
    'app-layout': HTMLElement;
  }
}
