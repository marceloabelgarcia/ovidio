import { Action } from 'core/types'

export const actions: { [key: string]: Action } = {
  fetch: {
    verb: 'fetch',
    actor: 'system',
    progress: 'fetching',
    finished: 'fetched',
  },
  fail: {
    verb: 'fail',
    actor: 'system',
    progress: 'failing',
    finished: 'failed',
  },
}
