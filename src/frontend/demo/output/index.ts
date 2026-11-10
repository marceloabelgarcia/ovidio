import { Widget, type Port } from '~/core'
import { Ux } from './ux'

/** Primitiva string (Output). port.input = mismo dato que escucha. */
export class Output extends Widget {
  constructor(port: Port = {}) {
    super(Ux, [], port)
  }
}
