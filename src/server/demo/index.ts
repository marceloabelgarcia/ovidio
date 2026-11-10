import { Widget } from '~/core'
import { Container, type LogicHost } from './container'
import { Leaf } from './leaf'

/** Demo backend: misma gramática Widget/Mother, sin DOM. */
export class Demo extends Widget {
  constructor() {
    super(Container, [Leaf])
  }

  /** Resultado del host lógico tras montar el árbol. */
  get host(): LogicHost {
    return (this.mother.ux as Container).interior
  }
}
