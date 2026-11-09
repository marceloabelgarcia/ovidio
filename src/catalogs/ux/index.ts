import './App/App'
import './Form/Form'
import './Field/Field'
import './Actions/Actions'

/** Cáscaras UX por nombre de `container` del catálogo (tags CE). */
const Primitives = {
  App: 'ux-app',
  Form: 'ux-form',
  Field: 'ux-field',
  Actions: 'ux-actions',
} as const

export type PrimitiveType = keyof typeof Primitives

/** Lookup de cáscara UX por nombre de `container` del catálogo. */
function shellOf(name: string): string | undefined {
  return Primitives[name as PrimitiveType]
}

export * as FormTypes from './Form/types'
export * as FieldTypes from './Field/types'
export * as ActionsTypes from './Actions/types'
export * as AppTypes from './App/types'

export { Primitives, shellOf }
