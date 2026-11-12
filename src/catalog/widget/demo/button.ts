import { Button } from '../button/button'
import { Display } from '../display/display'
import { Input } from '../input/input'
import { Container } from '../container'
import { OnAction, Output } from '../types'
import { HtmlContainer } from '../html-container'
import { Trigger } from '../types'
import { Widget } from '../widget'

/** Shell mínimo del demo. */
class DemoContainer extends HtmlContainer {
  constructor(
    parent: Container,
    triggers: Trigger[] = [],
    onAction: OnAction = () => {},  
    value: unknown,
    type: string = 'string',
  ) {
    super(parent, document.createElement('div'), triggers, onAction, value, type)
  }

  override onChildAction(output: Output): void {
    console.log('demo container', output)
    super.onChildAction(output)
  }
}

/** Combinación: instancia hijos y se los pasa a Widget. */
export class ButtonDemo extends Widget {
  constructor(root: Container) {
    const button = new Button(root)
    const display = new Display(root)
    const input = new Input(root)
    super(root, DemoContainer, [button, display, input])
  }
}
