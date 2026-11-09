import { Trigger } from './Trigger'
import { trigger } from '~/catalogs/type/types'

const Primitives = {
  [trigger]: Trigger,
} as const

export type PrimitiveType = keyof typeof Primitives
export { Primitives, Trigger }
