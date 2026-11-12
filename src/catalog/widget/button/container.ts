import { Container } from '../container'
import { HtmlContainer } from '../html-container'
import { OnAction, Trigger } from '../types'

export class ButtonContainer extends HtmlContainer {
  constructor(
    parent: Container,
    triggers: Trigger[] = [],
    onAction: OnAction = () => {},
    value: unknown,
    type: string = 'string',
  ) {
    const button = document.createElement('button')
    const trigger = triggers[0] ?? { name: 'click', executed: 'clicked' }

    button.className = 'btn btn-primary'
    button.textContent = trigger.name

    super(parent, button, triggers.length ? triggers : [trigger], onAction, value, type)
  }
}
