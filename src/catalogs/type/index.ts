import {
  string,
  integer,
  object,
  date,
  email,
  text,
  tel,
  submit,
  leaves,
  type TypePart,
} from './types'
import * as context from './context'

const street: TypePart[] = [
  { name: 'name', type: string },
  { name: 'number', type: integer },
]

const address: TypePart[] = [
  { name: 'street', type: street },
  { name: 'city', type: string },
  { name: 'state', type: string },
  { name: 'zip', type: string },
]

const personal: TypePart[] = [
  { name: 'name', type: string },
  { name: 'email', type: email },
  { name: 'phone', type: tel },
  { name: 'address', type: address },
  { name: 'birthday', type: date },
]
const products: TypePart[] = [
  { name: 'name', type: string },
  { name: 'price', type: integer },
  { name: 'description', type: text },
  { name: 'image', type: string },
  { name: 'category', type: string },
  { name: 'stock', type: integer },
]

/** Acción de guardar: se desglosa hasta trigger (label Save). */
const save: TypePart[] = [
  { name: 'Save', type: submit },
]

const base = {
  address,
  personal,
  products,
  street,
  save,
  ...leaves,
  integer,
  ...context.catalog,
}

export type { TypePart, LeafName, LeafValue } from './types'
export {
  base,
  leaves,
  string,
  integer,
  object,
  date,
  email,
  tel,
  context,
}
export {
  boolean,
  text,
  hidden,
  password,
  url,
  search,
  trigger,
  submit,
} from './types'
export { save }

