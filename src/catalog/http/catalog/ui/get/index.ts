import { Port, TypePart } from 'core/types'
import { Widget } from 'core/widget'
import { FetchContainer } from '../../ux/fetch'

/**
 * Primitiva de sistema: como Input, pero el valor llega del backend (actor 'system').
 * Crea la caja de su TypePart; FetchContainer la llena.
 * No decide cuándo cargar: espera su port.trigger (p. ej. la orden 'load' de un botón).
 */
export class Get extends Widget {
  constructor(port: Port = {}) {
    const { name } = (port.input as TypePart) ?? {}

    super(new FetchContainer(port), [], port)

    if (name) this.set(name, undefined) // la caja nace acá
  }
}
