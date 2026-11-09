import {
  changedEvent,
  type Emit,
  type PrimitiveEvent,
} from '~/catalogs/primitives/events'
import type { Child } from './child'
import type { UxContainer } from './container'
import { Father } from './father'
import { Mother } from './mother'
import { Resources } from './resources'

/**
 * Nivel: cablea Mother ↔ Resources ↔ Father.
 * No HTML. No mount/unmount — bind(container) / dispose().
 */
export abstract class Widget {
  protected readonly mother = new Mother()
  readonly resources = new Resources()
  protected readonly father: Father

  #emitOuter: Emit = () => {}
  #bound = false

  protected abstract levelType(): string
  protected abstract createChildren(): Child[]

  constructor() {
    this.father = new Father(this.levelType())
    this.#wire()
  }

  /** Cable a Nivel 0 (lab/catálogo). */
  connect(emit: Emit): void {
    this.#emitOuter = emit
  }

  /** Mother dispone hijos en el contenedor UX que le pasen. */
  bind(container: UxContainer): void {
    if (this.#bound) this.dispose()
    this.mother.bind(container, this.createChildren())
    this.#bound = true
  }

  dispose(): void {
    this.mother.dispose()
    this.#bound = false
  }

  patch(props: Record<string, unknown>): void {
    this.mother.patch(props)
  }

  protected emitUp(event: PrimitiveEvent): void {
    this.#emitOuter(changedEvent(event.type, event.value, event.subject))
  }

  #wire(): void {
    this.mother.onChildEmit((event) => this.resources.receive(event))
    this.resources.onDispatch((job) => this.father.execute(job))
    this.father.onEmit((event) => this.emitUp(event))
  }
}
