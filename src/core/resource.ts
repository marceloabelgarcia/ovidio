import { Action, Output, Port, Trigger, TriggerRelation } from './types'

type DispatchHandler = (output: Output) => void

/** La caja del valor: la crea la primitiva y todos los niveles apuntan a la misma. */
export type Ref = NonNullable<Output['resource']>

/** Clave lógica de un trigger: la acción en ese estado (change + finished → 'changed'). */
export const triggerKey = (trigger?: Trigger): string | undefined => {
  const key = trigger?.action?.[trigger.state]
  return typeof key === 'string' ? key : undefined
}

export abstract class Resource {
  /** Referencias por tipo (no valores): la fuente vive en la primitiva. */
  private resources: Record<string, Ref> = {}
  /** Como addEventListener, pero para señales lógicas (submitted → …). */
  private listeners = new Map<string, DispatchHandler[]>()
  /** Switch hacia abajo: clave de trigger → hijos que la esperan (port.trigger). */
  private triggers = new Map<string, Resource[]>()
  /** Traducciones ya registradas ('changed→saved'), para no subir dos veces lo mismo. */
  private relayed = new Set<string>()
  public port!: Port
  /** Padre lógico en la cadena de dispatch (Widget/Mother). */
  parent: Resource | null = null

  /** Valor vivo: se lee de la caja, siempre el actual. */
  public get(key: string): unknown {
    return this.resources[key]?.value
  }

  /** La caja misma (para pasarla en un dispatch). */
  public ref(key: string): Ref | undefined {
    return this.resources[key]
  }

  /** Escribe en la caja; si no existe, este nivel la crea (es la primitiva). */
  public set(key: string, value: unknown): void {
    const ref = this.resources[key]
    if (ref) ref.value = value
    else this.resources[key] = { type: key, value }
  }

  /** Apunta a una caja ajena. Asigna un puntero, no copia el valor. */
  protected link(ref: Ref): void {
    this.resources[ref.type] = ref
  }

  /** Al montar: tomar las cajas de un hijo para tenerlas antes del primer evento. */
  protected adopt(child: Resource): void {
    for (const ref of Object.values(child.resources)) {
      if (!this.resources[ref.type]) this.link(ref)
    }
  }

  /** Suscripción lógica (análogo a element.addEventListener). */
  protected on(signal: string, handler: DispatchHandler): void {
    const list = this.listeners.get(signal) ?? []
    if (list.includes(handler)) return // como addEventListener: el mismo handler no se duplica
    list.push(handler)
    this.listeners.set(signal, list)
  }

  /** Arma el switch una sola vez, con los hijos ya instanciados. */
  protected mapTriggers(children: Resource[]): void {
    this.triggers.clear()
    for (const child of children) {
      const key = triggerKey(child.port?.trigger)
      if (!key) continue
      const list = this.triggers.get(key) ?? []
      list.push(child)
      this.triggers.set(key, list)
    }
  }

  protected addListeners(action: Action, relation: TriggerRelation): void {
    const out = triggerKey(relation.trigger)
    for (const key of [action.verb, action.finished, action.progress, action.actor]) {
      if (!key) continue
      // misma traducción (escucho key → emito out) ya registrada: no duplicar
      const pair = `${key}→${out}`
      if (this.relayed.has(pair)) continue
      this.relayed.add(pair)
      this.on(key, (output) => {
        this.parent?.dispatched(
          {
            event: {
              trigger: relation.trigger,
              time: new Date(),
              target: this,
            },
            resource: output.resource,
          },
          this,
        )
      })
    }
  }

  /**
   * Llega un evento a este nivel.
   * `from` es el hijo directo que lo trajo (null si nació en este mismo nivel).
   */
  public dispatched(output: Output, from: Resource | null = null): void {

    // guardar el puntero a la caja que llega (último que emitió ese tipo)
    if (typeof output.resource?.type === 'string') this.link(output.resource)

    const key = triggerKey(output.event.trigger)

    // abajo: hermanos que esperan este trigger, menos el que lo trajo
    if (key) {
      this.triggers.get(key)?.forEach((child) => {
        if (child !== from) child.execute(output)
      })
    }

    // arriba: traducir con relations, o subir el mismo output
    const handlers = key ? this.listeners.get(key) : undefined
    if (handlers?.length) {
      for (const handler of handlers) handler(output)
      return
    }

    this.parent?.dispatched(output, this)
  }

  /** Orden que baja desde el padre. Cada Widget decide qué hace con ella. */
  public execute(_output: Output): void {}
}
