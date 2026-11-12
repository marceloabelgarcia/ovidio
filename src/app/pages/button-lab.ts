import { HtmlContainer } from '~/catalog/widget/html-container'
import { ButtonDemo } from '~/catalog/widget/demo/button'

/** Contenedor raíz de la page (#app). */
export class AppContainer extends HtmlContainer {
  constructor(app: HTMLElement) {
    super(null, app)
  }
}

/** Runtime: importa del catálogo, arma padre + hijos, enciende. */
export function ButtonLabPage(): void {
  const el = document.querySelector('#app') as HTMLElement
  const root = new AppContainer(el)
  new ButtonDemo(root)
}
