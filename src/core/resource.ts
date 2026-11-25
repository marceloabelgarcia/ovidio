import { Action, Output, Port, State, TriggerRelation } from './types'

type DispatchHandler = (output: Output) => void

export abstract class Resource {
  private resources: Record<string, unknown> = {}
  /** Como addEventListener, pero para señales lógicas (submitted → …). */
  private listeners = new Map<string, DispatchHandler[]>()
  public port!: Port
  /** Padre lógico en la cadena de dispatch (Widget/Mother). */
  parent: Resource | null = null

  public get(key: string): unknown {
    return this.resources[key]
  }

  public set(key: string, value: unknown): void {
    this.resources[key] = value
  }

  /** Suscripción lógica (análogo a element.addEventListener). */
  protected on(signal: string, handler: DispatchHandler): void {
    const list = this.listeners.get(signal) ?? []
    list.push(handler)
    this.listeners.set(signal, list)
  }

  /**
   * Igual que el button:
   *   el.addEventListener(action.verb, () => this.dispatched(...))
   * aquí:
   *   this.on(action.finished, (output) => this.parent?.dispatched(...))
   */
  protected addListeners(action: Action, relation: TriggerRelation): void {
    for (const key of [action.verb, action.finished, action.progress, action.actor]) {
      if (!key) continue
      this.on(key, (output) => {
        this.parent?.dispatched({
          event: {
            trigger: relation.trigger,
            time: new Date(),
            target: this,
          },
          resource: output.resource,
        })
      })
    }
  }

  public dispatched(output: Output): void {
    console.log('dispatched', output)

    const { type, value } = output.resource ?? {}
    if (typeof type === 'string') this.set(type, value)

    const state = output.event.trigger.state as State
    const incoming = output.event.trigger.action[state]
    const handlers =
      typeof incoming === 'string' ? this.listeners.get(incoming) : undefined

    if (handlers?.length) {
      for (const handler of handlers) handler(output)
      return
    }

    // sin listener: subir el mismo output
    this.parent?.dispatched(output)
  }

  public execute(action: Action): void {
    console.log('execute widget', action)
  }
}
