import type { Resources } from './resources'
import type { Emit, PrimitiveEvent } from './types'

/**
 * Jefe del nivel — usa Resources.
 * 1. Guarda values[type] = value
 * 2. Ejecuta triggers del verbo (excepto quien avisó)
 * 3. Opcional: asciende el mismo relato
 */
export class Father {
  constructor(
    readonly resources: Resources,
    private readonly emitUp?: Emit,
  ) {}

  receive(event: PrimitiveEvent, from?: symbol): void {
    if (event.type != null) {
      this.resources.set(event.type, event.value)
    }
    this.resources.runTriggers(event.verb, event, from)
    this.emitUp?.(event)
  }
}
