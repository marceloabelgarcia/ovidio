import { Widget } from 'core/widget'
import { Port, Trigger } from 'core/types'
import { Mother } from 'core/mother'
import { Node } from 'core/node'

/**
 * Realidad HTML: envuelve un HTMLElement como Node del core.
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

/** Hoja: Mother con host = HtmlNode(button). */
export class ButtonDemoHost extends Mother {
  constructor(port: Port = {}) {
    super()

    const button = document.createElement('button')
    button.textContent = 'Click me'
    button.className = 'btn btn-primary'
    button.addEventListener('click', () => {
      console.log('PORT:', port)
    })

    this.host = new HtmlNode(button)
  }
}

export class ButtonDemo extends Widget {
  constructor(port: Port = {}) {
    super(new ButtonDemoHost(port), [], port)
  }
}

/** Raíz: Mother con host = HtmlNode(#app). */
export class AppDemoHost extends Mother {
  constructor(el: HTMLElement) {
    super()
    this.host = new HtmlNode(el)
  }
}

const trigger: Trigger = {
  action: {
    verb: 'click',
    actor: 'user',
    progress: 'submitting',
    finished: 'submitted',
  },
  state: 'finished',
}

export class AppDemo extends Widget {
  constructor(el: HTMLElement) {
    const mother = new AppDemoHost(el)
    super(mother, [{ child: ButtonDemo, port: { trigger } }])
  }
}

export { AppDemo as Demo }
