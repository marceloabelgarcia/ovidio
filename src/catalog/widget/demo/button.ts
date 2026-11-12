import { Button } from '../button/button'
import { Display } from '../display/display'
import { Input } from '../input/input'
import { Container } from '../container'
import { OnAction, Output, TypePart } from '../types'
import { HtmlContainer } from '../html-container'
import { Trigger } from '../types'
import { Widget } from '../widget'

/** Shell mínimo del demo. */
class DemoContainer extends HtmlContainer {
  constructor(
    parent: Container,
    triggers: Trigger[] = [],
    onAction: OnAction = () => { },
    value?: HtmlContainer | string | undefined,
    type: string = 'string',
  ) {
    super(parent, document.createElement('div'), triggers, onAction, value, type)
  }

  override onChildAction(output: Output): void {
    console.log('demo container', output)
    super.onChildAction(output)
  }
}

export const string = 'string'
const changed: TypePart[] = [{ name: 'changed', type: string }]



/** Combinación: instancia hijos y se los pasa a Widget. */
export class ButtonDemo extends Widget {
  constructor(root: Container) {


    const button = new Button(new DemoContainer(root))
    const display = new Display(new DemoContainer(root),
      {
        trigger: { name: 'change', completed: 'changed' },
        input: 'name',
        output: [
          { name: 'changed', type: changed },
        ],
      }
    )
    const input = new Input(new DemoContainer(root), {
      input: 'name',
      output: [
        { name: 'changed', type: changed },
      ],
    })



    super(
      root,
      DemoContainer,
      [button, display, input],
      {
        input: 'street',
        trigger: { name: 'change', completed: 'changed' },
        output: [
          { name: 'changed', type: changed },
        ],
      }
    )
  }
}
