import { Widget, type Port } from '~/core'
import { Ux } from './ux'

/** Catálogo UI — emite el verbo de port.input. */
export class Button extends Widget {
  constructor(port: Port = {}) {
    super(Ux, [], port)
  }
}
