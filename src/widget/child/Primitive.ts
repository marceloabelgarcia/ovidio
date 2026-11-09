import { resolvePrimitive } from '~/widget/resolve'
import type { Father } from '~/widget/Father'
import type { Resources } from '~/widget/Resources'
import type { Changer, Worker } from '~/catalogs/primitives/events'

export type PrimitiveProps = {
  primitive: string
  name?: string
  value?: unknown
  father: Father
  /**
   * Alcance de primos (Fields): Output registra aquí su `changed`.
   * Hermanos directos (Save): Fetch usa el Resources local vía Father.
   */
  scope: Resources
}

/**
 * Equivalente a Primitive.vue + registro en Resources.
 */
export function mountPrimitive(host: HTMLElement, props: PrimitiveProps): void {
  const entry = resolvePrimitive(props.primitive)

  if (!entry) {
    const span = document.createElement('span')
    span.textContent = `Unknown primitive: ${props.primitive}`
    host.replaceChildren(span)
    return
  }

  const el = new entry.component()
  if (props.name) {
    el.setAttribute('name', props.name)
    el.setAttribute('label', props.name)
    el.setAttribute('type-name', props.name)
  }
  if (props.value !== undefined && props.value !== null) {
    el.setAttribute('value', String(props.value))
  }
  if (entry.binds) {
    for (const [key, value] of Object.entries(entry.binds)) {
      if (value === undefined || value === null) continue
      el.setAttribute(key, String(value))
    }
  }

  const local = props.father.resources
  const scope = props.scope
  const asChanger = el as unknown as Changer
  const asWorker = el as unknown as Worker
  const hasConnect = typeof asChanger.connect === 'function'
  const hasTriggers =
    typeof asWorker.triggers === 'object' && asWorker.triggers != null

  // Changer (Input, Trigger, Fetch): aviso → Father local (sube por emitUp).
  if (hasConnect) {
    const id = local.register(el as unknown as Changer & Worker)
    asChanger.connect((event) => props.father.receive(event, id))
  }

  // Worker puro (Output): exporta trigger al alcance de primos (Fields).
  // Fetch (changer+worker): connect en local; triggers.submitted en el alcance
  // de hermanos (Save), para que Father del nivel dispare al obrero.
  if (hasTriggers && !hasConnect) {
    scope.register(el as unknown as Worker)
  } else if (hasTriggers && hasConnect && scope !== local) {
    scope.register(el as unknown as Worker)
  }

  host.replaceChildren(el)
}
