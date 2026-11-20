import { Widget } from 'core/widget'
import { Port } from 'core/types'
import { Host, Children, Child } from 'core/host'
import { Node } from 'core/node'

/**
 * AppDemo: App + vistas.
 *
 *   App
 *     └── AppContainer
 *           └── StreetView.mother (ViewContainer)
 *                 ├── Input
 *                 ├── Display
 *                 └── Button
 */


export class HtmlNode extends Node {
  constructor(public readonly element: HTMLElement) {
    super()
  }

  append(child: Node): void {
    if (child instanceof HtmlNode) {
      this.element.appendChild(child.element)
    }
  }
}

export class ButtonDemoHost extends Node {
  

  constructor(port: Port = {}) {
    const button = document.createElement('button')
    button.textContent = 'Click me'
    button.className = 'btn btn-primary'

    button.addEventListener('click', () => {
      console.log('PORT:', port)
    })

    super([])
    // si Host.host = “realidad / punto de montaje” de este nivel:
    this.Host = button
  }
}

export class ButtonDemo extends Widget {
  constructor(port: Port = {}) {
    super(new ButtonDemoHost(port), [], port)
  }
}

export class AppDemoHost extends Host {

  constructor(el: HTMLElement) {
    super([])
    this.Host = el
  }
}

const trigger = {
  action: {
    verb: 'click',
    actor: 'button',
    progress: 'clicking',
    finished: 'clicked'
  },
  state: 'runing'
}
export class AppDemo extends Widget {
  constructor(el: HTMLElement) {
    
    const host = new AppDemoHost(el)
    super(host, [{ child: ButtonDemo, port: { input: trigger } }])
  }
}

export { AppDemo as Demo }
