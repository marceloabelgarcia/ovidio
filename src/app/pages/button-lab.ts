import { Demo } from 'catalog/html/demo/'


/** Runtime: Demo rellena el hueco de App. */
export function ButtonLabPage(): void {
  const el = document.querySelector('#app') as HTMLElement
  el.className = 'm-2 bg-gray-100 border border-black p-4 rounded-md'

  new Demo(el)
}
