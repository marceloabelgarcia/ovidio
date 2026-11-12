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
    value?: HtmlContainer | string | undefined,
    type: string = 'string',
  ) {
    super(parent, onAction)

    triggers.forEach((trigger) => {
      element.addEventListener(trigger.name, ($event: Event) => {
        this.handleAction({ trigger: trigger, type, value: ($event.target as HTMLInputElement).value as string })
      })
    })

    if (parent instanceof HtmlContainer) {
      parent.element.appendChild(element)
    }
    
  }


}
