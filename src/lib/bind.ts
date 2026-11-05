/**
 * Reactividad mínima: un valor + suscriptores.
 * No re-renderiza el componente entero; solo avisa a quien se suscribió.
 */
export type Signal<T> = {
  get(): T;
  set(value: T): void;
  subscribe(fn: (value: T) => void): () => void;
};

export function signal<T>(initial: T): Signal<T> {
  let value = initial;
  const listeners = new Set<(value: T) => void>();

  return {
    get: () => value,
    set(next) {
      if (Object.is(value, next)) return;
      value = next;
      for (const fn of listeners) fn(value);
    },
    subscribe(fn) {
      listeners.add(fn);
      fn(value);
      return () => listeners.delete(fn);
    },
  };
}

/** Une un signal de string a textContent de un nodo. Eso es el "{{ time }}". */
export function bindText(el: Element, source: Signal<string>): () => void {
  return source.subscribe((value) => {
    el.textContent = value;
  });
}
