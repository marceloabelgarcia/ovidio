import { Widget } from '../core/widget'
import { Container } from './container'
import { Button } from './button'

/** Nivel 0 — alberga Button dentro de Container. */
export class Demo extends Widget {
  constructor() {
    super(Container, [Button])
  }
}
