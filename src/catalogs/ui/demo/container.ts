export class Container {
    readonly host = document.querySelector('#app')!
  
  
    readonly container = document.createElement('div')  
    constructor(readonly html: HTMLElement) {
        this.container.appendChild(this.html)
        this.container.className = 'm-2 container border border-black rounded-md p-4 h-64'
        this.host.appendChild(this.container)
    }
}