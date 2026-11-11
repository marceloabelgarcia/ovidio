import { Widget, type Port } from '~/core'
import { Ux } from './ux'

/** Catálogo UI — string de entrada. */
export class Input extends Widget {
  constructor(port: Port = {}) {
    super(Ux, [], port)
  }
}
