import { Container } from '../container'
import { OnAction } from '../types'
import { HtmlContainer } from '../html-container'
import { Trigger } from '../types'

export class InputContainer extends HtmlContainer {
  constructor(
    parent: Container,
    triggers: Trigger[] = [],
    onAction: OnAction = () => {},
    value: string | HtmlContainer | undefined,
    type: string = 'string',
  ) {
    const input = document.createElement('input')
    const trigger = triggers[0] ?? 
    [
      { name: 'change', completed: 'changed' },
    ]
    input.className = 'input'
    input.value = value as string

    super(parent, input, triggers.length ? triggers : [trigger], onAction, value, type)
  }
}
