/**
 * Capa de resolución / construcción.
 * Lee catálogos y ofrece elementos para armar el árbol (widgets) o montar hojas (primitivas).
 * No es catálogo: catalogs/ solo declara.
 *
 * Child / Primitive importan solo de aquí — nunca de catalogs/.
 */
export { fromType, type TypeShell } from './fromType'
export { resolvePrimitive } from './primitive'
export {
  resolveWidget,
  type NodeWidget,
  type ResolvedWidget,
} from './widget'
