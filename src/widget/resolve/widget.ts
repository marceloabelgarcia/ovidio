import { WidgetCatalog } from '~/catalogs/widgets'
import type { NodeWidget, WidgetFactory, WidgetDecl } from '~/catalogs/widgets'

import { fromType } from './fromType'

export type { NodeWidget }

/** Resultado de resolver un nodo: nivel compuesto o hoja primitiva. */
export interface ResolvedWidget {
  level?: NodeWidget
  primitive?: string
  name?: string
}

/** Materializa el catálogo declarado → fábricas vivas. */
function buildWidgetUI(
  catalog: Record<string, WidgetDecl>,
): Record<string, WidgetFactory> {
  return Object.fromEntries(
    Object.entries(catalog).map(([name, entry]) => [
      name,
      typeof entry === 'function' ? entry : fromType(entry),
    ]),
  )
}

const WidgetUI = buildWidgetUI(WidgetCatalog)

/**
 * Busca en el registro materializado (template → fábrica) o reduce a hoja.
 * Child solo monta; no conoce el catálogo.
 */
export function resolveWidget(child: NodeWidget): ResolvedWidget {
  if (!child.template) {
    if (child.children?.length) return { level: child }
    return {
      primitive: child.port?.input,
      name: child.name,
    }
  }

  return { level: WidgetUI[child.template]?.(child) }
}
