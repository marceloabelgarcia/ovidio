import { HtmlNode } from '../../../core/html-container'
import { Port, TriggerRelation, Action } from 'core/types'

export class ButtonContainer extends HtmlNode {
  constructor(port: Port = {}) {
    const button = document.createElement('button')
    button.textContent = 'Click me'
    button.className = 'btn btn-primary'

    super(button, port)
  }

  protected addListeners(action: Action, relation: TriggerRelation): void {
    const el = this.element as HTMLButtonElement
    el.addEventListener(action.verb, ($event) => {
      this.widget?.dispatched({
        event: {
          trigger: relation.trigger,
          time: new Date(),
          target: el,
        },
        resource: {
          type: 'button',
          value: $event.target,
        },
      })
    })
  }
}
