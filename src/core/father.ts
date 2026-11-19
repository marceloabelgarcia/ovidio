import { dispatchOutput } from './dispatch'
import { Output, Port, Resource } from './types'


/**
 * Estado del nivel y punto de entrada al despacho.
 * La gestión de hijos corresponde a Container y la composición a Widget.
 */
export class Father {
  public parent: Father | null = null
  public readonly children: Father[] = []
  public port: Port = {}
  readonly resources: Record<string, unknown> = {}

  constructor(port: Port = {}) {
    this.port = port
  }

  dispatched(output: Output): void {
    dispatchOutput(this, output)
  }

  execute(_resource?: Resource): void {}
}
