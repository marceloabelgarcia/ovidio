import { Mother } from '../core/mother'

import { Container } from './container'
import { Index } from './button'

export class Demo {
  readonly mother: Mother

  constructor() {
    this.mother = new Mother(new Container(), new Index())
  }
}