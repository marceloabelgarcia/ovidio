import { Action, Output } from './types'

/**
 * Comunicación: bag de resources + protocolo de eventos.
 */
export abstract class Resource {
  private  resources: Record<string, unknown> = {}
  /** Padre lógico en la cadena de dispatch (Widget/Mother). */
  parent: Resource | null = null

  public get(key: string): unknown {
    return this.resources[key]
  }

  public set(key: string, value: unknown): void {
    this.resources[key] = value
  }

  abstract dispatched(output: Output): void

  abstract execute(action: Action): void
}
