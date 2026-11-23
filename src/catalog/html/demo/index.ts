import { Port, Trigger } from 'core/types'
import { Mother } from 'core/mother'
import { Widget } from 'core/widget'
import { HtmlNode } from '../core/html-container'
import { Button } from '../catalog/ui/button'
import { Display } from '../catalog/ui/display'
import { trigger, actions } from './ports'
import { Children } from 'core/mother'


export class InputDemoHtml extends Mother {
  constructor(port: Port = {}) {
    const input = document.createElement('input')
    input.className = 'input'

    input.addEventListener('change', () => {
      this.set('value', input.value)
      this.dispatched({
        event: { trigger, time: new Date(), target: input },
        resource: { type: 'input' },
      })
    })

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
      {
        child: Button, port: {
          ...port, relations:
          {
            triggers: [
              {
                trigger: { action: actions.submit, state: 'finished' },
                triggers: [actions.click],
              },
            ],
          }

        }
      },
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
