import type { NodeWidget } from '~/catalogs/widgets'
import type {
  Changer,
  PrimitiveEvent,
  Trigger,
  Worker,
} from '~/catalogs/primitives/events'

export type ResourceChild = Changer | Worker | (Changer & Worker)

type Entry = {
  id: symbol
  changer?: Changer
  worker?: Worker
}

function isChanger(node: ResourceChild): node is Changer {
  return typeof (node as Changer).connect === 'function'
}

function isWorker(node: ResourceChild): node is Worker {
  return (
    typeof (node as Worker).triggers === 'object' &&
    (node as Worker).triggers != null
  )
}

/**
 * Artefacto de Father: inventario del nivel.
 * — children: declaración NodeWidget (construcción)
 * — values: datos del nivel por predicado (`values[type] = value`)
 * — triggers: funciones expuestas por hojas Worker (Output, Fetch, …)
 */
export class Resources {
  readonly children: NodeWidget[] = []
  /** Store del nivel: clave = type/predicado del aviso (name, street, …). */
  readonly values: Record<string, unknown> = {}

  #entries: Entry[] = []

  constructor(children: NodeWidget[]) {
    this.children = children
  }

  /** Registra una hoja runtime (changer y/o worker). Devuelve id para excluir al emisor. */
  register(child: ResourceChild): symbol {
    const id = Symbol('resource')
    const entry: Entry = { id }
    if (isChanger(child)) entry.changer = child
    if (isWorker(child)) entry.worker = child
    this.#entries.push(entry)
    return id
  }

  setValue(type: string, value: unknown): void {
    this.values[type] = value
  }

  /**
   * Triggers del verbo en este nivel.
   * `except` = hijo que emitió — no se re-dispara a sí mismo.
   */
  triggersOf(verb: string, except?: symbol): Trigger[] {
    const found: Trigger[] = []
    for (const entry of this.#entries) {
      if (except && entry.id === except) continue
      const trigger = entry.worker?.triggers[verb]
      if (trigger) found.push(trigger)
    }
    return found
  }

  /** Enlaza changers al receptor de Father. */
  connectChangers(
    receive: (event: PrimitiveEvent, from: symbol) => void,
  ): void {
    for (const entry of this.#entries) {
      if (!entry.changer) continue
      const from = entry.id
      entry.changer.connect((event) => receive(event, from))
    }
  }
}
