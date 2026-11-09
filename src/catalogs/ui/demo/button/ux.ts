export class Ux {

  readonly button = document.createElement('button')

  constructor() {
    console.log('button · hijo lógico')

    this.button.className = 'btn btn-primary'
    this.button.textContent = 'Click me'
        
    this.button.addEventListener('click', () => {
      console.log('button clicked')
    })
  }

  get html(): HTMLElement {
    return this.button
  }
}