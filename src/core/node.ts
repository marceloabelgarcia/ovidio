
export abstract class Node {
  private _parent: Node | null = null

  public get parent(): Node | null {
    return this._parent
  }

  public set parent(value: Node | null) {
    this._parent = value
  }

  /** Colgar la realidad de un hijo dentro de esta. */
  abstract append(child: Node): void
}
