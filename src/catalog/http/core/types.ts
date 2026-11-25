import { Action } from 'core/types'

export const actions: { [key: string]: Action } = {
  /** verb 'load' = la orden · 'loading' = en curso · 'loaded' = terminado */
  load: {
    verb: 'load',
    actor: 'system',
    progress: 'loading',
    finished: 'loaded',
  },
  fail: {
    verb: 'fail',
    actor: 'system',
    progress: 'failing',
    finished: 'failed',
  },
}
