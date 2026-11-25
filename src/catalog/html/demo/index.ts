import { Port } from 'core/types'
import { Mother } from 'core/mother'
import { Widget } from 'core/widget'
import { HtmlNode } from '../core/html-container'
import { Button } from '../catalog/ui/button'
import { Input } from '../catalog/ui/input'
import { actions } from '../core/types'
import { name, door } from './type'
import { App } from '../catalog/ux/app' 






export class FlexContainer extends Mother {
  constructor(port: Port = {}) {

    const content: HTMLElement = document.createElement('div')
    content.className = 'flex flex-col p-2 gap-2'

    super(new HtmlNode(content), [], port)
  }
}





/** Widget que usa Container como mother + su receta. */
export class DemoWidget extends Widget {
  constructor(port: Port = {}) {
    super(new FlexContainer(), [
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


/** Widget raíz: mother = App(#app), hijo = DemoContainer. */
export class AppDemo extends Widget {
  constructor(el: HTMLElement) {
    super(new App(el), [
      { child: DemoWidget, port: {} },
    ])
  }
}

export { AppDemo as Demo }
