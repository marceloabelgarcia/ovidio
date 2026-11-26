/**
 * Los planes de ovidio: un archivo por plan y este índice con el orden.
 *
 * Para un hilo nuevo alcanza con leer este índice y el plan que toca, sin traer
 * la conversación entera. Al cerrar un hilo se actualiza su plan: lo que el usuario
 * decide pasa a `agreed`, y lo que queda sin decidir sigue en `open`.
 *
 * Los nombres de esta carpeta (Plan, Status, los campos y los archivos) son provisorios:
 * los decide el usuario.
 *
 * Cómo verificar un cambio (cada script explica en su cabecera qué mirar):
 *   npx tsc --noEmit -p .
 *   npx tsx --tsconfig tsconfig.json scripts/verify/trace.mts | diff - scripts/verify/trace.expected.txt
 *   node scripts/verify/routes.mjs | diff - scripts/verify/routes.expected.txt   (con `npm run dev` corriendo)
 */
import { plan as resonance } from './resonance'
import { plan as history } from './history'
import { plan as liveCell } from './live-cell'
import { plan as catalog } from './catalog'
import { plan as core } from './core'
import { plan as names } from './names'
import { plan as page } from './page'
import { plan as server } from './server'

export type Status =
  | 'idea' // visión: guía las decisiones, todavía no se implementa
  | 'now' // en discusión o en curso
  | 'next' // lo que sigue
  | 'open' // decisiones abiertas, sin turno
  | 'later' // acordado para más adelante
  | 'done'

export type Plan = {
  title: string
  status: Status
  /** Última actualización (AAAA-MM-DD). */
  updated: string
  /** Por qué existe: el problema o la idea. */
  why: string
  /** Lo que el usuario decidió o dijo. No se vuelve a discutir sin él. */
  agreed: string[]
  /** Lo que propuso Claude y el usuario todavía no aceptó. */
  proposed: string[]
  /** Lo que falta decidir. */
  open: string[]
  /** Otros planes que tocan esto, por nombre de archivo. */
  related: string[]
}

/** Primero la visión; después, en el orden en que se trabajan. */
export const plans: Plan[] = [resonance, catalog, liveCell, history, core, names, page, server]
