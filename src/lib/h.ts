type Child = Node | string | null | undefined | false;

/** Construcción de DOM sin strings HTML. Para páginas y composición. */
export function h<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props?: Record<string, string | boolean | undefined> | null,
  ...children: Child[]
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);

  if (props) {
    for (const [key, value] of Object.entries(props)) {
      if (value === undefined || value === false) continue;
      if (key === 'className' || key === 'class') {
        el.className = String(value);
        continue;
      }
      if (key === 'text') {
        el.textContent = String(value);
        continue;
      }
      if (value === true) {
        el.setAttribute(key, '');
        continue;
      }
      el.setAttribute(key, String(value));
    }
  }

  for (const child of children) {
    if (child === null || child === undefined || child === false) continue;
    el.append(typeof child === 'string' ? document.createTextNode(child) : child);
  }

  return el;
}

export function fragment(...children: Child[]): DocumentFragment {
  const frag = document.createDocumentFragment();
  for (const child of children) {
    if (child === null || child === undefined || child === false) continue;
    frag.append(typeof child === 'string' ? document.createTextNode(child) : child);
  }
  return frag;
}
