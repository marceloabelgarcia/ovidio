import type { PrimitiveEvent, Trigger, Triggers } from './types'

export type ResourceEntry = {
  id: symbol
  /** Predicados a los que está cableado (port.input, …). */
  types: string[]
  triggers?: Triggers
}

/**
 * Artefacto de Father.
 * — values[type] = value
 * — triggers suscritos por hijos (Input, Output, …)
 */
export class Resources {
  readonly values: Record<string, unknown> = {}
  readonly #entries: ResourceEntry[] = []

  set(type: string, value: unknown): void {
    this.values[type] = value
  }

  get(type: string): unknown {
    return this.values[type]
  }

  register(entry: Omit<ResourceEntry, 'id'> & { id?: symbol }): symbol {
    const id = entry.id ?? Symbol()
    this.#entries.push({
      id,
      types: entry.types,
      triggers: entry.triggers,
    })
    return id
  }

  /**
   * Ejecuta triggers del verbo.
   * Omite al dueño del aviso (`except`) y entradas que no comparten el type.
   */
  runTriggers(
    verb: string,
    event: PrimitiveEvent,
    except?: symbol,
  ): void {
    for (const entry of this.#entries) {
      if (entry.id === except) continue
      if (
        event.type != null &&
        entry.types.length > 0 &&
        !entry.types.includes(event.type)
      ) {
        continue
      }
      const run: Trigger | undefined = entry.triggers?.[verb]
      run?.(event)
    }
  }
}
