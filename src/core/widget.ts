import { Container } from './container'
import { Port } from './types'

/** Hijos del nivel: siempre Widget. */
export type ChildCtor = new (port?: Port) => Widget

/** Spec de hijo: clase + port opcional. */
export type ChildSpec = {
  child: ChildCtor
  port?: Port
}

function spawn(spec: ChildSpec): Widget {
  return new spec.child(spec.port)
}

/**
 * Mother = Container | Widget (hueco).
 * Hijos = siempre Widget ({ child, port? }).
 * Si mother es Widget → hueco = mother.mother.
 * Al alojar un hijo → se cuelga su mother (shell / primitiva).
 */
export class Widget extends Container {
  public readonly mother: Container

  constructor(
    mother?: Container | Widget,
    children: ChildSpec[] = [],
    port: Port = {},
  ) {
    super([], port)

    this.mother =
      mother == null
        ? this
        : mother instanceof Widget
          ? mother.mother
          : mother

    if (mother != null) {
      this.mother.port = port
    }

    for (const spec of children) {
      const child = spawn(spec)
      this.mother.appendChild(child.mother)
    }
  }
}
