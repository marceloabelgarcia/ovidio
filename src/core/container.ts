import { Output } from './types'

/**
 * Árbol físico: parent / children / appendChild.
 * No sabe de port, resources ni Father.
 */
export class Container {
  public parent: Container | null = null
  public readonly children: Container[] = []

  protected onDispatch?: (output: Output) => void

  constructor(children: Container[] = []) {
    for (const child of children) {
      this.appendChild(child)
    }
  }

  public appendChild(child: Container): void {
    child.parent = this
    this.children.push(child)
  }

  /** Emite hacia el callback del nivel, o burbujea al padre físico. */
  public dispatch(output: Output): void {
    if (this.onDispatch) {
      this.onDispatch(output)
      return
    }
    this.parent?.dispatch(output)
  }

  public setDispatch(callback: (output: Output) => void): void {
    this.onDispatch = callback
  }
}
