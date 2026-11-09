import { Input } from './input'
import {
  string,
  hidden,
  date,
  email,
  password,
  tel,
  url,
  search,
  text,
  integer,
} from '~/catalogs/type/types'

const inputTypes = {
  [string]: 'text',
  [hidden]: 'hidden',
  [date]: 'date',
  [email]: 'email',
  [password]: 'password',
  [tel]: 'tel',
  [url]: 'url',
  [search]: 'search',
  [integer]: 'number',
} as const

const Primitives = {
  ...Object.fromEntries(Object.keys(inputTypes).map((key) => [key, Input])),
  [text]: Input,
} as const

export type PrimitiveType = keyof typeof Primitives
export { Primitives, Input, inputTypes }

export { Widget } from './widget'
export { Mother } from './mother'
export { Father } from './father'
export { Resources } from './resources'
export type { DispatchJob } from './resources'
export type { Child, HtmlChildView } from './child'
export { UxContainer } from './container'
export { HtmlContainer } from './html-container'
export { Unit } from './props-emits'
export { HtmlView } from './html'
export { InputUx } from './ux'
export { InputLevel } from './input'
