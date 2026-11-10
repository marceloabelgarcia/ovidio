import { withInterior } from './scope'

type Ctor = new (...args: never[]) => unknown

/** Shell que alberga ofrece interior. Terminal: sin interior. */
export type Shell = {
  interior?: unknown
  close?: () => void
}

/**
 * Mother(UxClass, [ChildClass, …]).
 * Crea el shell; si alberga, presta su interior a los hijos; luego close().
 */
export class Mother {
  readonly ux: Shell
  readonly children: unknown[] = []

  constructor(Ux: Ctor, Children: Ctor[] = []) {
    this.ux = new Ux() as Shell

    const build = () => {
      for (const Child of Children) {
        this.children.push(new Child())
      }
    }

    if (this.ux.interior != null) {
      withInterior(this.ux.interior, build)
    } else {
      build()
    }

    this.ux.close?.()
  }
}
