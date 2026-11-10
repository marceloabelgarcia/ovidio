import { Widget } from '~/core'
import { Container } from './container'
import { Leaf } from './leaf'

/** Demo backend: misma gramática Widget/Mother, sin DOM. */
export class Demo extends Widget {
  constructor() {
    super(Container, [Leaf])
  }
}
