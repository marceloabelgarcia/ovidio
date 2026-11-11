import { withInterior } from './scope'
import type { Notice } from './notice'
import type { Port } from './port'
import type { PrimitiveEvent } from './types'

type UxCtor = new (port?: Port) => unknown
type ChildCtor = new (port?: Port) => unknown

/** Hijo ya decidido por la combinación (se nace dentro del level del padre). */
export type ChildCreate = { create: () => unknown }

/** Clase, [clase, port], o create: () => new Pieza(...). */
export type ChildSpec = ChildCtor | [ChildCtor, Port] | ChildCreate

type MachineEvent = 'sending' | 'sended'

export type ShellApi = {
  port: Port
  notifyMachine: (happened: MachineEvent, detail?: unknown) => void
  notifyParent: (event: PrimitiveEvent) => void
}

export type Shell = {
  interior?: unknown
  close?: () => void
  on?: (listener: Notice) => void
  apply?: (value: unknown) => void
  busy?: (on: boolean) => void
  react?: (event: PrimitiveEvent, api: ShellApi) => void
}

function spawn(spec: ChildSpec): unknown {
  if (typeof spec === 'object' && spec !== null && 'create' in spec) {
    return spec.create()
  }
  if (Array.isArray(spec)) {
    const [Child, childPort] = spec
    return new Child(childPort)
  }
  return new spec()
}

/**
 * Mother — Ux de este nivel + hijos (nacen aquí, con el padre ya en level).
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
        this.children.push(spawn(spec))
      }
    }

    if (this.ux.interior != null) {
      withInterior(this.ux.interior, build)
    } else {
      build()
    }

    this.ux.close?.()
  }

  static tell(artifact: string, happened: string, detail?: unknown): void {
    console.log('[mother]', artifact, happened, detail ?? '')
  }
}
