import { ButtonContainer } from './container'
import { Container } from '../container'
import { Widget } from '../widget'
import { Port } from '../types'

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
      [{ name: 'click', completed: 'clicked' }],
    )
  }
}
