import { Container, OnAction, Trigger } from '../container'

export class ButtonContainer extends Container {
  constructor(
    parent: Container,
    triggers: Trigger[] = [],
    onAction: OnAction = () => {},
  ) {
    const button = document.createElement('button')
    const trigger = triggers[0] ?? { name: 'click', executed: 'clicked' }

    button.className = 'btn btn-primary'
    button.textContent = trigger.name

    super(parent, button, triggers.length ? triggers : [trigger], onAction)
  }
}
