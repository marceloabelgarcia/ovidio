import { attach, release } from '../../core/scope'

/**
 * Shell HTML del nivel Button.
 * attach abre el slot; close lo cierra cuando Mother terminó los hijos.
 */
export class Ux {
  readonly button = document.createElement('button')

  constructor() {
    this.button.className = 'btn btn-primary'
    this.button.textContent = 'Click me'
    this.button.addEventListener('click', () => {
      console.log('button clicked')
    })
    attach(this.button)
  }

  close() {
    release()
  }
}
