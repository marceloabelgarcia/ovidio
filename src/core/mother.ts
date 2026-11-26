import { Output, Port, Resource, Trigger } from './types'
import type { Widget } from './widget'
import { signal, triggerKey } from './resource'
import { Matrix } from './matrix'

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
 * Es la frontera con la realidad: lo de afuera entra a la cadena como hecho (emit)
 * y sale como acción (execute). Si trae un valor, lo escribe en la caja antes de avisar.
 * Entra vivo al widget: su realidad (HTML, red…) ya existe.
 */
export abstract class Mother {
  port: Port = {}
  /** El widget (jefe) que vive en este lugar. Lo asigna Widget al montar. */
  widget: Widget | null = null
  /** El cableado del nivel: in (hermanos que esperan) y out (el encargo del jefe). Vacío hasta montar. */
  private matrix = new Matrix<Widget>()

  constructor(port: Port = {}) {
    this.port = port
  }

  /** Alojar: colgar la realidad de un hijo dentro de la de este lugar. */
  abstract append(child: Mother): void

  /** Da a luz a la receta: instancia cada hijo y lo aloja. */
  appendChildren(children: Children): Widget[] {
    return children.map(({ child: Child, port }) => {
      const child = new Child(port)
      this.append(child.mother)
      return child
    })
  }

  /**
   * El cableado llega una vez, al montar. El lugar conecta a sus hermanos (in: lo que
   * cada obrero espera en su port.trigger); el jefe le deja su encargo (out: cuándo
   * molestarlo y con qué frase). La matriz no compone nada: lo recibe armado.
   */
  wire(children: Widget[], entrusted: Iterable<[string, Trigger]>): void {
    const waiting: [string, Widget][] = []
    for (const child of children) {
      const key = triggerKey(child.port?.trigger)
      if (key) waiting.push([key, child])
    }
    this.matrix = new Matrix(waiting, entrusted)
  }

  /**
   * Llega un aviso a este lugar: de uno de sus obreros (`from`) o nacido acá (null).
   */
  receive(output: Output, from: Widget | null = null): void {
    // memoria: el jefe guarda el puntero a la caja que pasa (en silencio: no se lo molesta)
    if (typeof output.resource?.type === 'string') this.widget?.link(output.resource)

    // in: los hermanos que lo esperan, menos el que lo trajo
    this.matrix.distribute(output, from)

    // out: si el jefe lo encargó, cuenta su frase (entra al in de la matriz de arriba)
    const sentences = this.matrix.exits(output)
    if (sentences.length) {
      for (const sentence of sentences) this.widget?.tell(sentence, output)
      return
    }
    // sin out: sube igual a la madre de arriba (opción a; la b lo dejaría acá)
    this.above()?.receive(output, this.widget)
  }

  /** Una orden que baja: la reciben los obreros que la esperan (el in de la matriz). */
  distribute(output: Output, from: Widget | null): void {
    this.matrix.distribute(output, from)
  }

  /**
   * Salida: la señal sale de la cadena como acción sobre la realidad
   * (mostrar, abrir, pedir…). Lee el valor de la caja que trae la señal.
   */
  execute(_output: Output): void {}

  /**
   * Entrada: lo de afuera entra a la cadena como hecho; la señal nace en este lugar.
   * Si trae un valor, el lugar ya lo escribió en la caja y la señal lleva su referencia.
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
