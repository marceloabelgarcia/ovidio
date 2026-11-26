import { Mother } from 'core/mother'
import { eachRelation } from 'core/resource'
import { Action, Port } from 'core/types'

/** Realidad HTML: Element o Text. */
export type HtmlContent = HTMLElement | Text

/**
 * Mother HTML: ella misma es el host (element + append).
 * Es también la frontera entre mundos: sus sensores capturan lo que pasa en el HTML
 * (teclado, mouse, pantalla…) y lo cuentan como gramática con `emit`.
 */
export class HtmlContainer extends Mother {
  constructor(
    public readonly element: HtmlContent,
    port: Port = {},
  ) {
    super(port)
    this.bindRelations()
  }

  append(child: Mother): void {
    if (!(child instanceof HtmlContainer)) return
    if (this.element instanceof HTMLElement) {
      this.element.appendChild(child.element)
    }
  }

  /**
   * Cuando la realidad ya existe: de las relations solo toma qué acciones sensar.
   * El lugar cuenta lo que pasó, conjugado ('released', 'changed'); contarlo con su frase es del jefe (su encargo en Mother.entrust).
   */
  protected bindRelations(): void {
    // un sensor por acción: repetido = aviso doble
    const sensed = new Set<string>()
    eachRelation(this.port, ({ action }) => {
      if (sensed.has(action.verb)) return
      sensed.add(action.verb)
      this.sense(action)
    })
  }

  /**
   * Hook sensor: capturar esa acción en el HTML y contarla con `emit`.
   * Un evento de la realidad es un hecho: sale conjugado en participio (state 'finished').
   * Hoy action.verb tiene que ser el nombre del evento del DOM ('click', 'change').
   */
  protected sense(_action: Action): void {}
}
