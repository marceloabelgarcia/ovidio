import type { Mother } from './mother'
import { Output, Port, TypePart } from './types'
import { Widget } from './widget'

/** Lo que acepta una receta: se construye solo con su port. */
type Place = new (port?: Port) => Mother
type Piece = new (port?: Port) => Widget

/**
 * Profundidad: un Widget cuyos hijos salen de la forma de su sustantivo, no de una receta escrita.
 * La subclase dice su lugar (`place`) y su hoja (`leaf`); el sustantivo raíz llega por `port.input`.
 *   parte compuesta → la misma subclase, una profundidad más
 *   parte hoja      → `leaf`
 * Cada hijo hereda el port tal cual, con `input` = su parte (los TypePart son de a pares:
 * cada profundidad conoce solo sus partes directas).
 * La matriz ordena cuándo fluye algo; el desglose ordena qué forma tiene.
 */
export class Breakdown extends Widget {
  static place: Place
  static leaf: Piece

  constructor(port: Port = {}) {
    // antes de super() no hay `this`: new.target es la subclase que se está construyendo
    const Self = new.target as typeof Breakdown
    const part = port.input as TypePart | undefined
    const parts = part && Array.isArray(part.type) ? part.type : []

    super(
      new Self.place(port),
      parts.map((p) => ({
        child: Array.isArray(p.type) ? Self : Self.leaf,
        port: { ...port, input: p },
      })),
      port,
    )
  }

  /**
   * Recibe el valor de su TypePart y le arma a cada hijo una caja nueva con su parte
   * (la parte apunta al valor de la caja de arriba; la caja es nueva).
   * Rodea la matriz: llama a child.execute a mano. El reparto por parte todavía no pasa por ella.
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
