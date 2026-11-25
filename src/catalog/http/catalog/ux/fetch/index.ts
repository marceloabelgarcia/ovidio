import { Output, Port, TypePart } from 'core/types'
import { HttpNode } from '../../../core/http-node'
import { actions } from '../../../core/types'

/**
 * Transporte: url → request → datos | error. Su realidad es la red.
 * Hace con la red lo que InputContainer hace con el DOM:
 * escribe en la caja del widget y emite la caja.
 */
export class FetchContainer extends HttpNode {
  readonly url: string
  /** Caja donde deja la respuesta: el TypePart de port.input, o 'response'. */
  readonly name: string

  constructor(port: Port = {}) {
    super(port)
    this.url = String(port.url ?? '')
    this.name = (port.input as TypePart | undefined)?.name ?? 'response'
  }

  async request(): Promise<unknown> {
    const res = await fetch(this.url, { headers: { accept: 'application/json' } })
    if (!res.ok) throw new Error(`GET ${this.url} → ${res.status} ${res.statusText}`)
    return res.json()
  }

  /** Un hermano emitió el trigger que espero: cargar. */
  execute(_output: Output): void {
    void this.load()
  }

  async load(): Promise<void> {
    const widget = this.widget
    if (!widget) return

    this.emit({ action: actions.fetch, state: 'progress' }, widget.ref(this.name)) // 'fetching'
    try {
      widget.set(this.name, await this.request()) // muta la caja: fuente única
      this.emit({ action: actions.fetch, state: 'finished' }, widget.ref(this.name)) // 'fetched'
    } catch (error) {
      // el error es un evento, no estado: viaja en un recurso propio y sube hasta quien lo espere
      this.emit(
        { action: actions.fail, state: 'finished' }, // 'failed'
        { type: 'error', value: error instanceof Error ? error.message : String(error) },
      )
    }
  }
}
