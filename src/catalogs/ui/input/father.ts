import type { Emit, PrimitiveEvent } from '~/catalogs/primitives/events'
import type { DispatchJob } from './resources'

/**
 * Jefe del nivel.
 * No importa Mother ni Resources — ejecuta el job y emite arriba.
 */
export class Father {
  #onEmit?: Emit
  #level: string

  constructor(level = 'level') {
    this.#level = level
  }

  /** Widget: Father → emitUp */
  onEmit(handler: Emit): void {
    this.#onEmit = handler
  }

  execute(job: DispatchJob): void {
    const { event, triggers, values } = job
    this.#tell(event, triggers.length, values)

    for (const trigger of triggers) {
      void trigger(event)
    }

    this.#onEmit?.(event)
  }

  #tell(
    event: PrimitiveEvent,
    n: number,
    values: Record<string, unknown>,
  ): void {
    const pred = event.type ?? ''
    console.log(
      `[${this.#level}] ${event.subject} → '${event.verb}' ${pred}`.trimEnd(),
      values,
      n ? `(${n} trigger/s)` : '(sin trigger local)',
    )
  }
}
