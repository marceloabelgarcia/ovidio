import { ButtonContainer } from './container'
import { Container } from '../container'
import { Port, Widget } from '../widget'

/** Leaf: parent ya instanciado; pasa ButtonContainer (clase) a Widget. Sin hijos. */
export class Button extends Widget {
  constructor(
    parent: Container,
    port: Port = {},
  ) {
    super(
      parent,
      ButtonContainer,
      [],
      port,
      [{ name: 'click', executed: 'clicked' }],
    )
  }
}
