import { Action, Output, Port, Resource, Trigger, TriggerRelation } from './types'

// Piezas del core. 'Resource' es solo la caja ({ type, value }): la crea la primitiva
// y todos los niveles apuntan a la misma.

/** Clave lógica de un trigger: la acción en ese estado (change + finished → 'changed'). */
export const triggerKey = (trigger?: Trigger): string | undefined => {
  const key = trigger?.action?.[trigger.state]
  return typeof key === 'string' ? key : undefined
}

/** La única forma de armar la señal que viaja (arriba con dispatched, abajo con execute). */
export const signal = (trigger: Trigger, target: unknown, resource?: Resource): Output => ({
  event: { trigger, time: new Date(), target },
  resource,
})

/** Recorre port.relations: cada acción que escucha, con la relation que la traduce. */
export const eachRelation = (
  port: Port,
  fn: (action: Action, relation: TriggerRelation) => void,
): void => {
  if (!Array.isArray(port.relations)) return
  port.relations.forEach((relation) => {
    relation?.triggers?.forEach((action) => fn(action, relation))
  })
}

/**
 * Matriz (switch): clave → lista. Una entrada no se repite bajo la misma clave.
 * `id` dice cuándo dos entradas son la misma (por defecto, la misma instancia).
 */
export class Matrix<T> {
  private readonly table = new Map<string, T[]>()

  constructor(private readonly id: (item: T) => unknown = (item) => item) {}

  /** Agrega; devuelve false si ya estaba (no se duplica). */
  add(key: string, item: T): boolean {
    const list = this.table.get(key) ?? []
    const id = this.id(item)
    if (list.some((x) => this.id(x) === id)) return false
    list.push(item)
    this.table.set(key, list)
    return true
  }

  get(key: string | undefined): readonly T[] {
    return (key && this.table.get(key)) || []
  }
}

/** Memoria de referencias por tipo (no valores): la fuente vive en la primitiva. */
export class Boxes {
  private readonly refs: Record<string, Resource> = {}

  /** Valor vivo: se lee de la caja, siempre el actual. */
  get(key: string): unknown {
    return this.refs[key]?.value
  }

  /** La caja misma (para pasarla en una señal). */
  ref(key: string): Resource | undefined {
    return this.refs[key]
  }

  /** Escribe en la caja; si no existe, la crea (este nivel es la primitiva). */
  set(key: string, value: unknown): void {
    const ref = this.refs[key]
    if (ref) ref.value = value
    else this.refs[key] = { type: key, value }
  }

  /** Apunta a una caja ajena. Asigna un puntero, no copia el valor. */
  link(ref: Resource): void {
    this.refs[ref.type] = ref
  }

  /** Toma las cajas de otro nivel que todavía no tiene. */
  adopt(other: Boxes): void {
    for (const ref of Object.values(other.refs)) {
      if (!this.refs[ref.type]) this.link(ref)
    }
  }
}
