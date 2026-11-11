import { Widget, type Port } from '~/core'
import { Ux } from './ux'

/** Catálogo UI — string de salida. */
export class Output extends Widget {
  constructor(port: Port = {}) {
    super(Ux, [], port)
  }
}
