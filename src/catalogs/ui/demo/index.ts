import { Mother } from '../core/mother'
import { Container } from './container'
import { Button } from './button'

/** Nivel 0 — Mother(Ux, children). */
export class Demo {
  readonly mother: Mother

  constructor() {
    this.mother = new Mother(Container, [Button])
  }
}
