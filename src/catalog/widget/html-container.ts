import { Container } from './container'
import { OnAction } from './types'
import { Trigger } from './types'

/** Container HTML: element + triggers DOM + montaje si el padre también es HTML. */
export class HtmlContainer extends Container {
  constructor(
    parent: Container | null,
    readonly element: HTMLElement,
    triggers: Trigger[] = [],
    onAction: OnAction = () => {},
    value: unknown,
    type: string = 'string',
  ) {
    super(parent, onAction, value, type)

    console.log(triggers);

    triggers.forEach((trigger) => {
      element.addEventListener(trigger.name, () => {
        console.log(trigger.completed);
        this.handleAction({ trigger: trigger, type, value })
      })
    })

    if (parent instanceof HtmlContainer) {
      parent.element.appendChild(element)
    }
  }
}
