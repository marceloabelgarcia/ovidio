import { attach } from '~/frontend/dom/attach'

/** Shell terminal: se cuelga del interior; no alberga. */
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
}
