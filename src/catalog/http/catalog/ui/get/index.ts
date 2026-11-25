import { Port, TypePart } from 'core/types'
import { Widget } from 'core/widget'
import { FetchContainer } from '../../ux/fetch'

/**
 * Primitiva de sistema: como Input, pero el valor llega del backend (actor 'system').
 * Crea la caja de su TypePart; FetchContainer la llena.
 *
 * - con port.trigger: carga cuando un hermano emite ese trigger (execute).
 * - sin port.trigger: carga al montar (catálogo de datos).
 */
export class Get extends Widget {
  constructor(port: Port = {}) {
    const { name } = (port.input as TypePart) ?? {}
    const mother = new FetchContainer(port)

    super(mother, [], port)

    if (name) this.set(name, undefined) // la caja nace acá

    // diferido: en el constructor todavía no hay parent y el 'fetching' se perdería
    if (!port.trigger) queueMicrotask(() => void mother.load())
  }
}
