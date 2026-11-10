import { Widget } from '~/core'
import { Container } from './container'
import { Button } from './button'

/** Demo frontend: Container alberga Button. */
export class Demo extends Widget {
  constructor() {
    super(Container, [Button])
  }
}
