import type { Port } from '~/core'
import { attach } from '~/frontend/dom/attach'

/** Catálogo UI — carcasa que alberga (fieldset + busy). */
export class Container {
  readonly el = document.createElement('fieldset')
  readonly legend = document.createElement('legend')
  readonly spinner = document.createElement('span')
  readonly interior = this.el

  constructor(port: Port = {}) {
    this.legend.className =
      'text-lg font-bold px-2 inline-flex items-center gap-2'
    this.legend.append(document.createTextNode(port.input ?? 'Demo'))

    this.spinner.className = 'loading loading-spinner loading-xs hidden'
    this.legend.append(this.spinner)

    this.el.append(this.legend)
    this.el.className =
      'm-2 container border border-black rounded-md p-4 min-h-24 flex flex-col gap-2 flex-shrink-0'
    attach(this.el)
  }

  busy(on: boolean): void {
    this.spinner.classList.toggle('hidden', !on)
  }

  close() {}
}
