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
 * Todo aviso de sus obreros llega acá: lo de los hijos queda acá, y al jefe
 * solo se lo molesta por lo que dejó encargado (sus relations).
 * Entra vivo al widget: su realidad (HTML, red…) ya existe.
 */
export abstract class Mother {
  port: Port = {}
  /** El widget (jefe) que vive en este lugar. Lo asigna Widget al montar. */
  widget: Widget | null = null
  /** Matriz de hermanos: clave de trigger → hijos que la esperan (su port.trigger). */
  private readonly siblings = new Matrix<Widget>()
  /** El encargo del jefe: clave que llega → frase con la que él la cuenta a su padre. */
  private readonly entrusted = new Matrix<Trigger>(triggerKey)

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

  /** El jefe deja encargado cuándo molestarlo (`key`) y qué frase va a contar (`sentence`). */
  entrust(key: string, sentence: Trigger): void {
    this.entrusted.add(key, sentence)
  }

  /**
   * Llega un aviso a este lugar: de uno de sus obreros (`from`) o nacido acá (null).
   */
  receive(output: Output, from: Widget | null = null): void {
    // memoria: el jefe guarda el puntero a la caja que pasa (en silencio: no se lo molesta)
    if (typeof output.resource?.type === 'string') this.widget?.link(output.resource)

    // horizontal: los hermanos que lo esperan, menos el que lo trajo
    this.distribute(output, from)

    // vertical: si el jefe lo encargó, cuenta su frase; si no, sube igual a la madre de arriba
    const sentences = this.entrusted.get(triggerKey(output.event.trigger))
    if (sentences.length) {
      for (const sentence of sentences) this.widget?.tell(sentence, output)
      return
    }
    this.above()?.receive(output, this.widget)
  }

  /** Los hermanos que esperan esta señal la ejecutan, menos el que la trajo. */
  distribute(output: Output, from: Widget | null): void {
    for (const child of this.siblings.get(triggerKey(output.event.trigger))) {
      if (child !== from) child.execute(output)
    }
  }

  /** Hook realidad: qué hace este lugar cuando su widget recibe una orden. */
  execute(_output: Output): void {}

  /**
   * La voz del lugar: la realidad cuenta lo que pasó; la señal nace en este lugar.
   * Quién la usa (sensores del HTML, la red…) es del catálogo, no del core.
   */
  protected emit(trigger: Trigger, resource?: Resource): void {
    this.receive(signal(trigger, this, resource))
  }

  /** La madre de arriba: donde nació el jefe de este lugar. */
  private above(): Mother | undefined {
    return this.widget?.parent?.mother
  }
}
