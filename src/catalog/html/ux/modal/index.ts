import { Port } from 'core/types'
import { Widget } from 'core/widget'
import { ModalContainer } from './container'

/**
 * Vista de la carcasa: con port.trigger (p. ej. fail/finished) se abre sola
 * cuando ese evento llega al nivel de su padre. El padre no necesita código.
 */
export class Modal extends Widget {
  constructor(port: Port = {}) {
    super(new ModalContainer(port), [], port)
  }
}

export { ModalContainer } from './container'
