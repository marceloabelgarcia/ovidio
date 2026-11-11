import { createNotice, type Port } from '~/core'
import { attach } from '~/frontend/dom/attach'

export class Ux {
  readonly button = document.createElement('button')
  readonly #notice = createNotice()
  readonly on = this.#notice.on

  constructor(port: Port = {}) {
    const verb = port.input ?? 'submitted'
    this.button.className = 'btn btn-primary'
    this.button.textContent = verb
    this.button.addEventListener('click', () => {
      this.#notice.emit(verb)
    })
    attach(this.button)
  }
}
