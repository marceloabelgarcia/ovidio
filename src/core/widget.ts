import { Output, Port, Resource, Trigger } from './types'
import { Children, Mother } from './mother'
import { Boxes, eachRelation, signal, triggerKey } from './resource'

/**
 * La unidad recursiva: obrero de su padre y jefe de sus hijos.
 * Lo vertical es suyo: saber quién es su jefe, contarle su frase (sus relations),
 * bajar órdenes (execute) y saber dónde está el recurso (referencias a las cajas).
 * Lo horizontal (dar a luz, alojar, conectar hermanos, recibir los avisos) es de su lugar: el Mother.
 */
export class Widget {
  public port!: Port
  /** El lugar donde viven sus obreros. Entra vivo (ya implementado). */
  public mother!: Mother
  /** Sus obreros (la receta ya nacida). */
  public children: Widget[] = []
  /** Su jefe: a quién le cuenta. */
  public parent: Widget | null = null
  /** Referencias a las cajas, por tipo. */
  private readonly boxes = new Boxes()

  constructor(
    mother: Mother | null = null,
    children: Children = [],
    port: Port = {},
  ) {
    this.port = port

    if (mother) {
      this.mother = mother
      mother.widget = this

      // el encargo: le deja a su lugar cuándo molestarlo y qué frase va a contar
      eachRelation(port, (source, relation) => {
        const key = triggerKey(source)
        if (key) mother.entrust(key, relation.trigger)
      })

      // el lugar da a luz y aloja; el jefe los toma como suyos
      this.children = mother.appendChildren(children)
      for (const child of this.children) {
        child.parent = this
        this.adopt(child)
      }
    }
  }

  public get(key: string): unknown {
    return this.boxes.get(key)
  }

  public ref(key: string): Resource | undefined {
    return this.boxes.ref(key)
  }

  public set(key: string, value: unknown): void {
    this.boxes.set(key, value)
  }

  /** Apunta a una caja ajena (la usa su lugar cuando pasa un aviso). */
  public link(ref: Resource): void {
    this.boxes.link(ref)
  }

  /** Al montar: tomar las cajas de un hijo para tenerlas antes del primer evento. */
  protected adopt(child: Widget): void {
    this.boxes.adopt(child.boxes)
  }

  /** Su relato: cuenta su frase en la madre donde nació (la de su jefe). Lo llama su lugar. */
  public tell(sentence: Trigger, output: Output): void {
    this.parent?.mother?.receive(signal(sentence, this, output.resource), this)
  }

  /**
   * Le llega una orden: la cumple su lugar (Mother) y la reparte entre sus obreros
   * que esperan esa misma clave. Así baja nivel a nivel, por un camino explícito:
   * solo pasa por quien declara ese trigger en su port.
   */
  public execute(output: Output): void {
    this.mother?.execute(output)
    this.mother?.distribute(output, null)
  }
}
