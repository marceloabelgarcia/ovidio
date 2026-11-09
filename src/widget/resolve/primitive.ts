import { PrimitiveCatalog } from '~/catalogs/primitives'
import type { PrimitiveEntry } from '~/catalogs/primitives'

/**
 * Busca en el catálogo de primitivas por path (`ui.input.string`).
 * Misma responsabilidad que resolveWidget: lookup, no conoce familias.
 */
export function resolvePrimitive(path: string): PrimitiveEntry | undefined {
  const parts = path.split('.')

  if (parts.length >= 3) {
    const [ns, family, ...rest] = parts
    const key = rest[rest.length - 1]
    if (!ns || !family || !key) return undefined
    return PrimitiveCatalog[ns]?.[family]?.[key]
  }

  /** `work.fetch` → namespace + familia (una hoja o la que coincide con el nombre). */
  if (parts.length === 2) {
    const [ns, family] = parts
    if (!ns || !family) return undefined
    const group = PrimitiveCatalog[ns]?.[family]
    if (!group) return undefined
    return group[family] ?? group.default ?? Object.values(group)[0]
  }

  for (const space of Object.values(PrimitiveCatalog)) {
    for (const family of Object.values(space)) {
      const hit = family[path]
      if (hit) return hit
    }
  }
  return undefined
}
