import type { Resources } from './Resources'
import type { Emit, PrimitiveEvent } from '~/catalogs/primitives/events'

/**
 * Jefe del nivel — usa Resources como artefacto.
 *
 * 1. Guarda values[type] = value
 * 2. Ejecuta triggers del verbo (excepto el hijo que avisó)
 * 3. Asciende el mismo aviso (type/value del predicado que cambió)
 */
export class Father {
  readonly resources: Resources

  constructor(
    resources: Resources,
    private readonly emitUp?: Emit,
    /** Predicado de este nivel (address, street, name…) — solo relato/log. */
    private readonly type?: string,
  ) {
    this.resources = resources
    // Los changers se conectan al registrar la hoja (Primitive),
    // cuando el artefacto ya está en Resources.
  }

  receive(event: PrimitiveEvent, from?: symbol): void {
    if (event.type != null && event.type !== '') {
      this.resources.setValue(event.type, event.value)
    }

    this.tell(event, from)

    for (const trigger of this.resources.triggersOf(event.verb, from)) {
      void trigger(event)
    }

    this.emitUp?.(event)
  }

  private tell(event: PrimitiveEvent, from?: symbol): void {
    const level = this.type ?? 'level'
    const pred = event.type ?? ''
    const n = this.resources.triggersOf(event.verb, from).length
    console.log(
      `[${level}] ${event.subject} → '${event.verb}' ${pred}`.trimEnd(),
      { ...this.resources.values },
      n ? `(${n} trigger/s)` : '(sin trigger local)',
    )
  }
}
