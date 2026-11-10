import { currentInterior } from '~/core'
import type { LogicHost } from '../container'

/** Terminal de servidor: usa el interior prestado, no alberga. */
export class Ux {
  constructor() {
    const host = currentInterior() as LogicHost | undefined
    host?.nodes.push('leaf')
    console.log('[server] leaf bajo', host)
  }
}
