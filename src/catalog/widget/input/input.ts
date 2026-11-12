import { InputContainer } from './container'
import { Container } from '../container'
import { Widget } from '../widget'
import { Port } from '../types'

/** Leaf: parent ya instanciado; pasa ButtonContainer (clase) a Widget. Sin hijos. */
export class Input extends Widget {
  constructor(
    parent: Container,
    port: Port = { input: 'name' },
  ) {
    super(
      parent,
      InputContainer,
      [],
      port,
      [
        { name: 'change', completed: 'changed' },
        // { name: 'input', completed: 'inputted' }
      ],
    )
  }
}
