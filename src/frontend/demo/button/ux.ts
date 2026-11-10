import { createNotice } from '~/core'
import { attach } from '~/frontend/dom/attach'

/**
 * Shell terminal: se cuelga del interior; emite avisos a su Widget.
 */
export class Ux {
  readonly button = document.createElement('button')
  readonly #notice = createNotice()
  readonly on = this.#notice.on

  constructor() {
    this.button.className = 'btn btn-primary'
    this.button.textContent = 'Click me'
    this.button.addEventListener('click', () => {
      this.#notice.emit('click')
    })
    attach(this.button)
  }
}
