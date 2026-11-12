import { DisplayContainer } from './container'
import { Container } from '../container'
import { Widget } from '../widget'
import { Port } from '../types'

/** Leaf: parent ya instanciado; pasa ButtonContainer (clase) a Widget. Sin hijos. */
export class Display extends Widget {
  constructor(
    parent: Container,
    port: Port = {},
  ) {
    super(
      parent,
      DisplayContainer,
      [],
      port,
      [{ name: 'show', completed: 'showed' }],
    )
  }
}
