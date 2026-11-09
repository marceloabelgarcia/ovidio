import { Mother } from '../../core/mother'
import { Ux } from './ux'

/** Nivel 1 — Mother(Ux); no conoce #app ni Demo. */
export class Button {
  readonly mother: Mother

  constructor() {
    this.mother = new Mother(Ux)
  }
}
