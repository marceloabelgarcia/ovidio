/** Unidad de realidad agnóstica (no es el Node del browser). */
export abstract class Node {
    /** Colgar la realidad de un hijo dentro de esta. */
    abstract append(child: Node): void
  }