import { Mother } from '../../core/mother'

import { Ux } from './ux'
import { Button } from './button'


export class Index {
  readonly mother: Mother

  constructor() {
    this.mother = new Mother(new Ux(), new Button())
  }
}
