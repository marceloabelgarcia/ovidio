/**
 * Vocabulario hoja compartido (datos + UI).
 * No uses `type String = string`: en valor eso es el String global.
 */
export const string = 'string'
/** Entero de dominio; valor runtime / port = `number` (primitiva numérica). */
export const integer = 'number'
export const boolean = 'boolean'
export const object = 'object'
export const text = 'text'
export const hidden = 'hidden'
export const date = 'date'
export const email = 'email'
export const password = 'password'
export const tel = 'tel'
export const url = 'url'
export const search = 'search'
/** Control de acción (botón). */
export const trigger = 'trigger'
/** Alias de nivel “submit”: mismo control que trigger. */
export const submit = trigger

/** Registro de hojas: clave = nombre en `base` / ports. */
export const leaves = {
  string,
  number: integer,
  boolean,
  object,
  text,
  hidden,
  date,
  email,
  password,
  tel,
  url,
  search,
  trigger,
  submit,
} as const


export type LeafName = keyof typeof leaves
export type LeafValue = (typeof leaves)[LeafName]

export type TypePart = {
  name: string
  type: string | TypePart[]
}
