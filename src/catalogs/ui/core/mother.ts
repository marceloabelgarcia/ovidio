type Ctor = new (...args: never[]) => unknown
type Shell = { close?: () => void }

/**
 * Mother(UxClass, [ChildClass, …]).
 * Instancia el shell, luego los hijos; si el shell abrió HTML, close().
 */
export class Mother {
  readonly ux: Shell
  readonly children: unknown[]

  constructor(Ux: Ctor, Children: Ctor[] = []) {
    this.ux = new Ux() as Shell
    this.children = Children.map((Child) => new Child())
    this.ux.close?.()
  }
}
