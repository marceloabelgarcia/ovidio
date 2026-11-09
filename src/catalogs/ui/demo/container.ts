import { attach, release } from '../core/scope'

/**
 * Shell HTML del nivel Demo.
 * attach abre el slot; close lo cierra cuando Mother terminó los hijos.
 */
export class Container {
  readonly el = document.createElement('div')

  constructor() {
    this.el.className =
      'm-2 container border border-black rounded-md p-4 min-h-24'
    attach(this.el)
  }

  close() {
    release()
  }
}
