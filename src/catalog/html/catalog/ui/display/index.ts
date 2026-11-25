import { OutputContainer } from '../../ux/output'
import { Port } from 'core/types'
import { Widget } from 'core/widget'

/**
 * Vista pura: no es primitiva, no crea caja.
 * Con port.input = TypePart muestra el valor de ese tipo cuando le llega su trigger.
 */
export class Display extends Widget {
  constructor(port: Port = {}) {
    super(new OutputContainer(port), [], port)
  }
}
