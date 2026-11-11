import type { Father } from './father'
import {
  matchesClosure,
  outputParts,
  type Port,
  type TypePart,
} from './port'
import type { PrimitiveEvent, Trigger, Triggers } from './types'

export type ResourceEntry = {
  id: symbol
  types: string[]
  triggers?: Triggers
}

/**
 * Inventario del nivel.
 * — values[type]
 * — triggers de hijos
 * — outputs: cuándo y con qué verbo avisar al padre
 */
export class Resources {
  readonly values: Record<string, unknown> = {}
  readonly #entries: ResourceEntry[] = []
  #outputs: TypePart[] = []
  #father?: Father

  connect(father: Father): void {
    this.#father = father
  }

  /** Declara cierres del nivel (desde port.output). */
  setOutputs(output?: Port['output']): void {
    this.#outputs = outputParts(output)
  }

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

  accept(event: PrimitiveEvent, from?: symbol): void {
    if (event.type != null && event.type !== 'trigger') {
      this.set(event.type, event.value)
    }
    this.#father?.onAlert(event, from)
  }

  runTriggers(
    verb: string,
    event: PrimitiveEvent,
    except?: symbol,
  ): void {
    for (const entry of this.#entries) {
      if (entry.id === except) continue
      if (
        event.type != null &&
        event.type !== 'trigger' &&
        entry.types.length > 0 &&
        !entry.types.includes(event.type)
      ) {
        continue
      }
      const run: Trigger | undefined = entry.triggers?.[verb]
      run?.(event)
    }
  }

  /**
   * Cierres que este evento dispara → Father emite al padre con verb = name.
   */
  closuresFor(event: PrimitiveEvent): TypePart[] {
    return this.#outputs.filter((part) => matchesClosure(part, event))
  }
}
