import { Action, Output, Port } from './types'

export abstract class Resource {
  private  resources: Record<string, unknown> = {}
  public port!: Port
  /** Padre lógico en la cadena de dispatch (Widget/Mother). */
  parent: Resource | null = null

  public get(key: string): unknown {
    return this.resources[key]
  }

  public set(key: string, value: unknown): void {
    this.resources[key] = value
  }

  public dispatched(output: Output): void { 
    console.log('dispatched', output)
    
    console.log('resources', this.resources)
    console.log('port', this.port)
    console.log('parent-port', this.parent?.port)
    console.log('--------------------------------')
  }

  public execute(action: Action): void {
    console.log('execute widget', action)
  }
}
