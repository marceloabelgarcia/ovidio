import { Output, Port, TypePart } from 'core/types'
import { Widget } from 'core/widget'
import { FieldsetContainer } from '../../ux/fieldset'
import { Display } from '../display'

/**
 * Desglose por TypePart. Cada nivel conoce solo sus partes directas (de a pares):
 *   address → street, city, state, zip
 *   street  → name, door
 * Parte compuesta → otro Fieldset; parte hoja (string, number…) → Display, la primitiva.
 * name es libre: se resuelve dentro de su padre, así que otro padre puede tener su propio name.
 */
export class Fieldset extends Widget {
  constructor(port: Port = {}) {
    const part = port.input as TypePart | undefined
    const parts = part && Array.isArray(part.type) ? part.type : []

    super(
      new FieldsetContainer(port),
      parts.map((p) => ({
        child: Array.isArray(p.type) ? Fieldset : Display,
        port: { input: p },
      })),
      port,
    )
  }

  /**
   * Recibe el valor de su TypePart y le arma a cada hijo una caja nueva con su parte
   * (la parte apunta al valor de la caja de arriba; la caja es nueva).
   * Rodea la matriz: llama a child.execute a mano. El desglose por input todavía
   * no tiene lugar en el core (la matriz ordena trigger/relations, no input).
   */
  public execute(output: Output): void {
    const part = this.port.input as TypePart | undefined
    const value = output.resource?.value
    if (!part || output.resource?.type !== part.name) return
    if (value == null || typeof value !== 'object') return

    for (const child of this.children) {
      const sub = child.port.input as TypePart | undefined
      if (!sub || !(sub.name in value)) continue
      child.execute({
        ...output,
        resource: { type: sub.name, value: (value as Record<string, unknown>)[sub.name] },
      })
    }
  }
}
