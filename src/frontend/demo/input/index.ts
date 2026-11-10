import { Widget, type Port } from '~/core'
import { Ux } from './ux'

/** Primitiva string (Input). port.input = nombre del dato. */
export class Input extends Widget {
  constructor(port: Port = {}) {
    super(Ux, [], port)
  }
}
