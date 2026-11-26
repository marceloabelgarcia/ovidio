import { Output, Port, Resource, Trigger } from './types'
import type { Widget } from './widget'
import { Matrix, signal, triggerKey } from './resource'

export type Child = {
  child: new (port?: Port) => Widget
  port?: Port
}

export type Children = Child[]

/**
 * El lugar: donde viven y trabajan los obreros de un nivel.
 * Lo horizontal es suyo: darlos a luz (la receta), alojarlos (host) y conectar a los hermanos.
 * Entra vivo al widget: su realidad (HTML, red…) ya existe.
 */
export abstract class Mother {
  port: Port = {}
  /** El widget (jefe) que vive en este lugar. Lo asigna Widget al montar. */
  widget: Widget | null = null
  /** Matriz de hermanos: clave de trigger → hijos que la esperan (su port.trigger). */
  private readonly siblings = new Matrix<Widget>()

  constructor(port: Port = {}) {
    this.port = port
  }

  /** Alojar: colgar la realidad de un hijo dentro de la de este lugar. */
  abstract append(child: Mother): void

  /** Da a luz a la receta: instancia cada hijo, lo aloja y lo conecta con sus hermanos. */
  appendChildren(children: Children): Widget[] {
    return children.map(({ child: Child, port }) => {
      const child = new Child(port)
      this.append(child.mother)
      const key = triggerKey(child.port?.trigger)
      if (key) this.siblings.add(key, child)
      return child
    })
  }

  /** Horizontal: los hermanos que esperan esta señal la ejecutan, menos el que la trajo. */
  distribute(output: Output, from: Widget | null): void {
    for (const child of this.siblings.get(triggerKey(output.event.trigger))) {
      if (child !== from) child.execute(output)
    }
  }

  /** Hook realidad: qué hace este lugar cuando su widget recibe una orden. */
  execute(_output: Output): void {}

  /**
   * La voz del lugar: la realidad avisa a su widget; la señal nace en este nivel y sube desde ahí.
   * Quién la usa (sensores del HTML, la red…) es del catálogo, no del core.
   */
  protected emit(trigger: Trigger, resource?: Resource): void {
    this.widget?.dispatched(signal(trigger, this, resource))
  }
}
