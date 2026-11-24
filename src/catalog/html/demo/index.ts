import { Port } from 'core/types'
import { Mother } from 'core/mother'
import { Widget } from 'core/widget'
import { HtmlNode } from '../core/html-container'
import { Button } from '../catalog/ui/button'
import { Input } from '../catalog/ui/input'
import { actions } from '../core/types'
import { name, door } from './type'








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
        child: Button,
        port: {
          ...port,
          relations: [
            {
              trigger: { action: actions.submit, state: 'finished' },
              triggers: [actions.click],
            },
          ],

        },
      },
      { child: Input, port: { input: name } },
      { child: Input, port: { input: door } },
      { child: Input, port: 
        { 
          input: name,
          trigger: { action: actions.change, state: 'finished' },
        } 
      },
    ],
  {
    relations: [
      {
        trigger: { action: actions.save, state: 'finished' },
        triggers: [actions.submit],
      },
    ]
  })
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
      { child: DemoContainer, port: {} },
    ])
  }
}

export { AppDemo as Demo }
