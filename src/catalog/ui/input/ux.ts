import { createNotice, type Port } from '~/core'
import { attach } from '~/frontend/dom/attach'

export class Ux {
  readonly input = document.createElement('input')
  readonly #notice = createNotice()
  readonly on = this.#notice.on

  constructor(port: Port = {}) {
    const key = port.input ?? 'string'
    this.input.className = 'input input-bordered'
    this.input.type = 'text'
    this.input.name = key
    this.input.placeholder = key
    this.input.addEventListener('input', () => {
      this.#notice.emit('changed', this.input.value)
    })
    attach(this.input)
  }

  apply(value: unknown): void {
    this.input.value = value == null ? '' : String(value)
  }
}
