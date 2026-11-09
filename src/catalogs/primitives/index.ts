import { Primitives as inputComponents, inputTypes } from '~/catalogs/ui/input'
import { Primitives as triggerComponents } from '~/catalogs/ui/trigger'
import { Primitives as outputComponents } from '~/catalogs/ui/output'
import { Primitives as workFetch } from '~/catalogs/work/fetch'
import type { PrimitiveEntry, PrimitiveFamily } from './types'

export type { PrimitiveEntry, PrimitiveFamily, PrimitiveRuntimeFactory } from './types'

function familyOf(
  components: Record<string, CustomElementConstructor>,
  bindsByKey?: Record<string, string>,
): PrimitiveFamily {
  return Object.fromEntries(
    Object.entries(components).map(([key, component]) => {
      const htmlType = bindsByKey?.[key]
      const entry: PrimitiveEntry = {
        component,
        ...(htmlType ? { binds: { type: htmlType } } : {}),
      }
      return [key, entry]
    }),
  )
}

/**
 * Catálogo de primitivas: namespace → familia → hoja.
 * — `ui.input`   entrada de dato (Mother + hoja)
 * — `ui.trigger` disparador (Submit)
 * — `ui.output`  salida
 * — `work.*`     obreros (fetch, …)
 */
export const PrimitiveCatalog: Record<string, Record<string, PrimitiveFamily>> = {
  ui: {
    input: familyOf(
      inputComponents as Record<string, CustomElementConstructor>,
      inputTypes as Record<string, string>,
    ),
    trigger: familyOf(
      triggerComponents as Record<string, CustomElementConstructor>,
    ),
    output: familyOf(outputComponents as Record<string, CustomElementConstructor>),
  },
  work: {
    fetch: familyOf(workFetch as Record<string, CustomElementConstructor>),
  },
}
