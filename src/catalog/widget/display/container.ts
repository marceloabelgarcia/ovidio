import { Container } from '../container'
import { OnAction } from '../types'
import { HtmlContainer } from '../html-container'
import { Trigger } from '../types'

export class DisplayContainer extends HtmlContainer {
  constructor(
    parent: Container,
    triggers: Trigger[] = [],
    onAction: OnAction = () => {},
    value: HtmlContainer | string = 'HOLA MUNDO',
    type: string = 'string',
  ) {
    const display = document.createElement('div')

    display.className = 'border border-gray-300 rounded-md p-2 h-20'

    if (typeof value === 'string') {
      display.textContent = value
    } else {
      display.appendChild(value.element)
    }

    super(parent, display, triggers, onAction, value, type)
  }
}
