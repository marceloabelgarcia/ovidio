import { Output, Trigger } from './types'
import { triggerKey } from './resource'

/** Lo que la matriz puede despertar: cualquier cosa que actúe con una señal. */
export type Worker = { execute(output: Output): void }

/** Tabla clave → lista, sin repetidos. `id` dice cuándo dos entradas son la misma. */
class Table<T> {
  private readonly rows = new Map<string, T[]>()

  constructor(private readonly id: (item: T) => unknown = (item) => item) {}

  add(key: string, item: T): void {
    const list = this.rows.get(key) ?? []
    const id = this.id(item)
    if (list.some((x) => this.id(x) === id)) return
    list.push(item)
    this.rows.set(key, list)
  }

  get(key: string | undefined): readonly T[] {
    return (key && this.rows.get(key)) || []
  }
}

/**
 * El cableado de un nivel: el eje por donde fluyen los sucesos. Mecánica pura, agnóstica a su contexto.
 *   in:  clave → obreros que reaccionan (los hermanos que la esperan)
 *   out: clave → frases con las que la señal sale del nivel
 * El out de una matriz entra al in de la matriz de arriba: el flujo es una cadena de matrices.
 * Lo de afuera entra a la cadena como hecho (Mother.emit) y sale como acción (Mother.execute).
 * El valor no viaja por la cadena: vive en las cajas (Boxes), y la señal lleva su referencia.
 * No compone su cableado: le llega completo al construirse y no cambia.
 */
export class Matrix<W extends Worker = Worker> {
  private readonly ins = new Table<W>()
  private readonly outs = new Table<Trigger>(triggerKey)

  constructor(ins: Iterable<[string, W]> = [], outs: Iterable<[string, Trigger]> = []) {
    for (const [key, worker] of ins) this.ins.add(key, worker)
    for (const [key, sentence] of outs) this.outs.add(key, sentence)
  }

  /** In: los cableados a esta clave actúan, menos el que trajo la señal. */
  distribute(output: Output, from: W | null = null): void {
    for (const worker of this.ins.get(triggerKey(output.event.trigger))) {
      if (worker !== from) worker.execute(output)
    }
  }

  /** Out: con qué frases sale del nivel esta señal (vacío: no tiene out). */
  exits(output: Output): readonly Trigger[] {
    return this.outs.get(triggerKey(output.event.trigger))
  }
}
