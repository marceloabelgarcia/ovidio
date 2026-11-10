import { withInterior } from './scope'
import type { Notice } from './notice'
import type { Port } from './port'

type UxCtor = new (port?: Port) => unknown
type ChildCtor = new (port?: Port) => unknown

/** Hijo suelto, o hijo + port al presentarlo. */
export type ChildSpec = ChildCtor | [ChildCtor, Port]

/** Shell: carcasa del nivel. */
export type Shell = {
  interior?: unknown
  close?: () => void
  on?: (listener: Notice) => void
  /** Baja un valor al artefacto (trigger changed, …). */
  apply?: (value: unknown) => void
}

/**
 * Mother(UxClass, children, port?).
 * children: Class | [Class, port]
 */
export class Mother {
  readonly ux: Shell
  readonly children: unknown[] = []
  readonly port: Port

  constructor(Ux: UxCtor, Children: ChildSpec[] = [], port: Port = {}) {
    this.port = port
    this.ux = new Ux(port) as Shell

    const build = () => {
      for (const spec of Children) {
        if (Array.isArray(spec)) {
          const [Child, childPort] = spec
          this.children.push(new Child(childPort))
        } else {
          this.children.push(new spec())
        }
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
