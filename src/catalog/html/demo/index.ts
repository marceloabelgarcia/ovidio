import { Port, Trigger } from 'core/types'
import { Mother } from 'core/mother'
import { Node } from 'core/node'
import { Widget } from 'core/widget'

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

const trigger: Trigger = {
  action: {
    verb: 'click',
    actor: 'user',
    progress: 'submitting',
    finished: 'submitted',
  },
  state: 'finished',
}

/** Hoja: crea el DOM y lo pasa a Mother en el super. */
export class ButtonDemo extends Mother {
  constructor(port: Port = {}) {
    const button = document.createElement('button')
    button.textContent = 'Click me'
    button.className = 'btn btn-primary'
    button.addEventListener('click', () => {
      console.log('PORT:', port)
    })

    super(new HtmlNode(button))
  }
}

export class InputDemoHtml extends Mother {
  constructor(port: Port = {}) {
    const input = document.createElement('input')
    input.className = 'input'
    super(new HtmlNode(input))
  }
}

export class InputDemo extends Widget {
  constructor(port: Port = {}) {
    super(new InputDemoHtml(port), [])
  }
}

/**
 * Contenedor reutilizable: solo el hueco (sin el de página).
 * Lo monta quien lo cuelga (p. ej. App / #app vía appendChildren).
 */
export class Container extends Mother {
  constructor(_port: Port = {}) {
    const div = document.createElement('div')
    div.className = 'p-2 border border-black'
    super(new HtmlNode(div))
  }
}

/** Widget que usa Container como mother + su receta. */
export class DemoContainer extends Widget {
  constructor(port: Port = {}) {
    super(new Container(), [
      { child: ButtonDemo, port },
      { child: InputDemo, port },
    ])
  }
}

/** Mother de página: el llega aquí (desde button-lab → AppDemo). */
export class App extends Mother {
  constructor(el: HTMLElement) {
    super(new HtmlNode(el))
  }
}

/** Widget raíz: mother = App(#app), hijo = DemoContainer. */
export class AppDemo extends Widget {
  constructor(el: HTMLElement) {
    super(new App(el), [
      { child: DemoContainer, port: { trigger } },
    ])
  }
}

export { AppDemo as Demo }
