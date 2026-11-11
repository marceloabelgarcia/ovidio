import type { Resources } from './resources'
import type { Emit, PrimitiveEvent } from './types'

/**
 * Father — ejecuta triggers locales y, si port.output aplica, avisa al padre
 * con la palabra nueva del cierre (loaded, success, error…).
 */
export class Father {
  constructor(
    readonly resources: Resources,
    private readonly emitUp?: Emit,
  ) {
    this.resources.connect(this)
  }

  onAlert(event: PrimitiveEvent, from?: symbol): void {
    console.log('[father]', event.subject, event.verb, event.type ?? '', {
      value: event.value ?? null,
      values: { ...this.resources.values },
    })

    this.resources.runTriggers(event.verb, event, from)

    // Solo sube si hay cierre declarado en port.output
    for (const closure of this.resources.closuresFor(event)) {
      this.emitUp?.({
        ...event,
        verb: closure.name,
      })
    }
  }
}
