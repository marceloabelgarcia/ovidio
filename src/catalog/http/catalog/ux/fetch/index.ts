import { Output, Port, TypePart } from 'core/types'
import { HttpNode } from '../../../core/http-node'
import { actions } from '../../../core/types'

/** Mock del backend, fijo: un catálogo ordenado por TypePart (raíz → sus partes). */
const CATALOG = '/mock/catalog.json'

/**
 * Transporte: pide el catálogo y entrega la entrada de su TypePart.
 * Hace con la red lo que InputContainer hace con el DOM:
 * escribe en la caja del widget y emite la caja.
 */
export class FetchContainer extends HttpNode {
  /** Entrada del catálogo que pide: el name del TypePart de port.input. */
  readonly name: string

  constructor(port: Port = {}) {
    super(port)
    this.name = (port.input as TypePart | undefined)?.name ?? ''
  }

  async request(): Promise<Record<string, unknown>> {
    const res = await fetch(CATALOG, { headers: { accept: 'application/json' } })
    if (!res.ok) throw new Error(`GET ${CATALOG} → ${res.status} ${res.statusText}`)
    return res.json()
  }

  /** Un hermano emitió el trigger que espero: cargar. */
  execute(_output: Output): void {
    void this.load()
  }

  async load(): Promise<void> {
    const widget = this.widget
    if (!widget) return

    this.emit({ action: actions.load, state: 'progress' }, widget.ref(this.name)) // 'loading'
    try {
      const catalog = await this.request()
      if (!(this.name in catalog)) throw new Error(`'${this.name}' no está en el catálogo`)
      widget.set(this.name, catalog[this.name]) // muta la caja: fuente única
      this.emit({ action: actions.load, state: 'finished' }, widget.ref(this.name)) // 'loaded'
    } catch (error) {
      // el error es un evento, no estado: viaja en un recurso propio y sube hasta quien lo espere
      this.emit(
        { action: actions.fail, state: 'finished' }, // 'failed'
        { type: 'error', value: error instanceof Error ? error.message : String(error) },
      )
    }
  }
}
