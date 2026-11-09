import type {
  PrimitiveEvent,
  Trigger,
  Worker,
} from '~/catalogs/primitives/events'

export type DispatchJob = {
  event: PrimitiveEvent
  triggers: Trigger[]
  values: Record<string, unknown>
  from?: symbol
}

type Entry = {
  id: symbol
  worker?: Worker
}

/**
 * Aparato del nivel.
 * No conoce Mother ni Father — solo recibe mensajes y dispara un dispatch.
 */
export class Resources {
  readonly values: Record<string, unknown> = {}
  #entries: Entry[] = []
  #onDispatch?: (job: DispatchJob) => void

  /** Widget: Resources → Father.execute */
  onDispatch(handler: (job: DispatchJob) => void): void {
    this.#onDispatch = handler
  }

  /** Workers que exponen triggers (Output, Fetch, …). */
  register(worker: Worker): symbol {
    const id = Symbol('resource')
    this.#entries.push({ id, worker })
    return id
  }

  receive(event: PrimitiveEvent, from?: symbol): void {
    if (event.type != null && event.type !== '') {
      this.values[event.type] = event.value
    }

    this.#onDispatch?.({
      event,
      triggers: this.#triggersOf(event.verb, from),
      values: { ...this.values },
      from,
    })
  }

  #triggersOf(verb: string, except?: symbol): Trigger[] {
    const found: Trigger[] = []
    for (const entry of this.#entries) {
      if (except && entry.id === except) continue
      const trigger = entry.worker?.triggers[verb]
      if (trigger) found.push(trigger)
    }
    return found
  }
}
