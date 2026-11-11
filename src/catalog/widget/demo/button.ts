import { Button } from '../button/button'
import { Container, OnAction, Trigger } from '../container'
import { Widget } from '../widget'

/** Shell mínimo del demo: Widget instancia esta clase. */
class DemoContainer extends Container {
  constructor(
    parent: Container,
    triggers: Trigger[] = [],
    onAction: OnAction = () => {},
  ) {
    super(parent, document.createElement('div'), triggers, onAction)
  }
}

/**
 * Combinación: instancia hijos y se los pasa a Widget.
 * (De momento el Button sigue colgando del root; el parenting fino viene después.)
 */
export class ButtonDemo extends Widget {
  constructor(root: Container) {
    const button = new Button(root, (verb: string) => {
      console.log('clicked ', verb)
    })

    super(root, DemoContainer, [button], {})
  }
}
