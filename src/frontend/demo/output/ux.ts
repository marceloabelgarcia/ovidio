import type { Port } from '~/core'
import { attach } from '~/frontend/dom/attach'

/** Shell Output string: solo baja el valor (trigger changed). */
export class Ux {
  readonly output = document.createElement('output')

  constructor(port: Port = {}) {
    const key = port.input ?? 'string'
    this.output.className = 'input input-bordered cursor-default'
    this.output.name = key
    this.output.textContent = ''
    this.output.title = key
    attach(this.output)
  }

  apply(value: unknown): void {
    this.output.textContent = value == null ? '' : String(value)
  }
}
