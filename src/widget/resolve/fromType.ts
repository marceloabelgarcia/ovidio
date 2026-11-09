import { base, type TypePart } from '~/catalogs/type'
import type { NodeWidget, WidgetFactory, TypeShell } from '~/catalogs/widgets/types'

export type { TypeShell }

function leaf(
  shell: TypeShell,
  shape: string,
  name: string,
  input: string = name,
): NodeWidget {
  return {
    name,
    container: shell.container,
    port: { input },
    children: [{ port: { input: `${shell.prefix}.${shape}` }, name }],
  }
}

function fromPart(shell: TypeShell, part: TypePart): NodeWidget {
  if (Array.isArray(part.type)) {
    return {
      name: part.name,
      port: { input: part.name },
      children: part.type.map(child => fromPart(shell, child)),
    }
  }
  return leaf(shell, part.type, part.name)
}

/**
 * Lee el catálogo de tipos y arma un árbol NodeWidget.
 * Los niveles conservan el recurso o campo en port.input;
 * solo la hoja final usa el path del catálogo de primitivas.
 */
export function fromType(shell: TypeShell): WidgetFactory {
  return (request) => {
    const shape = request.port?.input
    if (!shape) {
      return { name: request.name ?? shell.name, children: [] }
    }

    const name = request.name ?? shape
    const def = base[shape as keyof typeof base]

    if (Array.isArray(def)) {
      return {
        name,
        port: { input: shape },
        children: (def as TypePart[]).map(part => fromPart(shell, part)),
      }
    }

    return leaf(shell, typeof def === 'string' ? def : shape, name, shape)
  }
}
