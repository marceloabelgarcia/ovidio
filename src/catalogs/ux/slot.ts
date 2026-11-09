/**
 * Proyección light-DOM (diferencia vs Vue slots).
 * Vive en catalogs/ux — no en widget/ (allí Mother usa shellOf).
 */
export function mountWithSlots(host: HTMLElement, html: string): void {
  const projected = Array.from(host.childNodes);
  host.innerHTML = html.trim();

  for (const node of projected) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (!node.textContent?.trim()) continue;
      host.querySelector('[data-slot="default"]')?.append(node);
      continue;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) continue;

    const el = node as Element;
    const name = el.getAttribute('slot') ?? 'default';
    const target = host.querySelector(`[data-slot="${CSS.escape(name)}"]`);
    if (target) target.append(el);
  }
}

export function defineLayout(
  tag: string,
  html: string,
  setup?: (host: HTMLElement) => void | (() => void),
): void {
  if (customElements.get(tag)) return;

  class LayoutElement extends HTMLElement {
    #cleanup?: () => void;
    #mounted = false;

    connectedCallback() {
      if (this.#mounted) return;
      this.#mounted = true;
      mountWithSlots(this, html);
      const result = setup?.(this);
      if (typeof result === 'function') this.#cleanup = result;
    }

    disconnectedCallback() {
      this.#cleanup?.();
    }
  }

  customElements.define(tag, LayoutElement);
}
