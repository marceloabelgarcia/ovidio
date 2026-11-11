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

  /** Captura lo que sube por containers (p. ej. loading del layout). */
  override onChildAction(verb: string): void {
    console.log('demo container', verb)
    super.onChildAction(verb)
  }
}

/** Hijos se crean con el host del demo para entrar en la cadena de containers. */
export class ButtonDemo extends Widget {
  constructor(root: Container) {
    super(root, DemoContainer, (host) => [new Button(host)])
  }
}
