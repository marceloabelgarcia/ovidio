import { attach } from '~/frontend/dom/attach'

/** Shell HTML que alberga: ofrece interior a Mother. */
export class Container {
  readonly el = document.createElement('div')
  readonly interior = this.el

  constructor() {
    this.el.className =
      'm-2 container border border-black rounded-md p-4 min-h-24'
    attach(this.el)
  }

  close() {
    // nivel completo: hijos ya creados
  }
}
