import { currentInterior } from '~/core'

/** Cuelga el nodo en el interior actual, o en #app si es la raíz. */
export function attach(el: HTMLElement): void {
  const host =
    (currentInterior() as HTMLElement | undefined) ??
    document.querySelector('#app')
  if (!host) throw new Error('no hay host DOM (#app ni interior)')
  host.append(el)
}
