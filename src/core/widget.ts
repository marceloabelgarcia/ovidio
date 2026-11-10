import { Mother } from './mother'

type Ctor = new (...args: never[]) => unknown

/**
 * Forma base de un nivel: Mother(Ux, children).
 * Portable: frontend y backend.
 */
export class Widget {
  readonly mother: Mother

  constructor(Ux: Ctor, Children: Ctor[] = []) {
    this.mother = new Mother(Ux, Children)
  }
}
