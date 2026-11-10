/**
 * Pila de anidación HTML.
 * Cada shell (Container, Ux, …) hace attach(); Mother hace release() al cerrar el nivel.
 */
const stack: HTMLElement[] = []

export function currentSlot(): HTMLElement {
  return stack.at(-1) ?? document.querySelector('#app')!
}

/** Cuelga el nodo en la cima y lo deja abierto para el siguiente HTML. */
export function attach(el: HTMLElement): void {
  currentSlot().append(el)
  stack.push(el)
}

/** Cierra el shell del nivel actual. */
export function release(): void {
  stack.pop()
}
