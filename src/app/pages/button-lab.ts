import { DemoContainer } from 'catalog/html/demo/container'
import { AppContainer } from 'catalog/html/core/app-container'


/** Runtime: AppContainer adopta el button. */
export function ButtonLabPage(): void {
  const el = document.querySelector('#app') as HTMLElement
  el.className = 'm-2 bg-gray-100 border border-black p-4 rounded-md'
  const root = new AppContainer(el)
  new DemoContainer(root)
}
