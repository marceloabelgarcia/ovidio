import { OutputContainer } from '../../ux/output'
import { Port } from 'core/types'
import { Widget } from 'core/widget'

/**
 * Primitiva de vista: la obrera hoja que trabaja con el recurso mostrándolo.
 * No crea caja: lee la que le llega. Con port.input = TypePart muestra solo ese tipo.
 */
export class Display extends Widget {
  constructor(port: Port = {}) {
    super(new OutputContainer(port), [], port)
  }
}
