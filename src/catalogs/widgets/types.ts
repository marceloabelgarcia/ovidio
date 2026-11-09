// Este tipo no debe modificarse nunca; si hace falta, algo se está planteando mal.

export interface NodeWidget {
  name?: string
  container?: string
  /** Nombre de un widget del catálogo. Si hay template, no hay children. */
  template?: string
  port?: {
    input?: string
    trigger?: string
    output?: string
  }
  /** Solo nodos del árbol — nunca Component. */
  children?: NodeWidget[]
}

/** Toda fábrica materializa un NodeWidget desde el nodo petición. */
export type WidgetFactory = (request: NodeWidget) => NodeWidget

/**
 * Cascarón tipado: cómo bajar el tipo a primitivas (recurso en `port.input`).
 * Declaración de catálogo; `fromType` vive en resolve.
 */
export interface TypeShell {
  name?: string
  container?: string
  /** Familia UI: `ui.input` | `ui.output` → hojas `ui.input.string`, … */
  prefix: string
}

/** Entrada del catálogo: cascarón tipado o composición explícita. */
export type WidgetDecl = TypeShell | WidgetFactory
