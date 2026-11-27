import { Breakdown } from 'core/breakdown'
import { Display } from 'catalog/html/ux/display'
import { FieldsetContainer } from './container'

/**
 * Desglose por TypePart en un <fieldset>. Cada nivel conoce solo sus partes directas (de a pares):
 *   address → street, city, state, zip
 *   street  → name, door
 * Parte compuesta → otro Fieldset; parte hoja (string, number…) → Display, la primitiva.
 * name es libre: se resuelve dentro de su padre, así que otro padre puede tener su propio name.
 * El desglose lo hace Breakdown: Fieldset solo dice su lugar y su hoja.
 */
export class Fieldset extends Breakdown {
  static place = FieldsetContainer
  static leaf = Display
}

export { FieldsetContainer } from './container'
