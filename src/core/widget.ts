import { Action, Output, Port, Resource, Trigger, TriggerRelation } from './types'
import { Children, Mother } from './mother'
import { Boxes, eachRelation, Matrix, signal, triggerKey } from './resource'

/**
 * La unidad recursiva: obrero de su padre y jefe de sus hijos.
 * Lo vertical es suyo: saber quién es su jefe, avisarle (traduciendo con relations),
 * bajar órdenes (execute) y saber dónde está el recurso (referencias a las cajas).
 * Lo horizontal (dar a luz, alojar, conectar hermanos) es de su lugar: el Mother.
 */
export class Widget {
  public port!: Port
  /** El lugar donde viven sus obreros. Entra vivo (ya implementado). */
  public mother!: Mother
  /** Sus obreros (la receta ya nacida). */
  public children: Widget[] = []
  /** Su jefe: a quién le avisa. */
  public parent: Widget | null = null
  /** Referencias a las cajas, por tipo. */
  private readonly boxes = new Boxes()
  /** Matriz de subida: clave que llega → trigger con el que se le avisa al jefe (port.relations). */
  private readonly up = new Matrix<Trigger>(triggerKey)

  constructor(
    mother: Mother | null = null,
    children: Children = [],
    port: Port = {},
  ) {
    this.port = port

    if (mother) {
      this.mother = mother
      mother.widget = this

      eachRelation(port, (action, relation) => this.relay(action, relation))

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

  protected link(ref: Resource): void {
    this.boxes.link(ref)
  }

  /** Al montar: tomar las cajas de un hijo para tenerlas antes del primer evento. */
  protected adopt(child: Widget): void {
    this.boxes.adopt(child.boxes)
  }

  /** Relevo: cada estado de la acción se le avisa al jefe como relation.trigger. */
  protected relay(action: Action, relation: TriggerRelation): void {
    for (const key of [action.verb, action.finished, action.progress, action.actor]) {
      if (key) this.up.add(key, relation.trigger)
    }
  }

  /**
   * Llega un aviso a este nivel.
   * `from` es el obrero que lo trajo (null si nació en este mismo nivel).
   */
  public dispatched(output: Output, from: Widget | null = null): void {
    // memoria: guardar el puntero a la caja que llega (último que emitió ese tipo)
    if (typeof output.resource?.type === 'string') this.link(output.resource)

    // horizontal: el lugar lo reparte entre los hermanos que lo esperan
    this.mother?.distribute(output, from)

    // vertical: traducir y avisar al jefe, o pasarle el mismo aviso
    const outs = this.up.get(triggerKey(output.event.trigger))
    if (outs.length) {
      for (const out of outs) this.parent?.dispatched(signal(out, this, output.resource), this)
      return
    }
    this.parent?.dispatched(output, this)
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
