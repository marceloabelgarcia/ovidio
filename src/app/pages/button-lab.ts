import { Demo } from 'catalog/html/demo/'


/** Runtime: #app → Demo (Widget) con mother AppContainer. */
export function ButtonLabPage(): void {
  const el = document.querySelector('#app') as HTMLElement
  el.className = 'm-2 bg-gray-100 border border-black p-4 rounded-md'

  new Demo(el)
}
