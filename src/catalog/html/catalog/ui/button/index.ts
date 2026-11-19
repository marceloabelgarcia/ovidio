import { ButtonContainer } from './button-container'
import { Port } from 'core/types'
import { Widget } from 'core/widget'

/** Button de catálogo: mother = ButtonContainer. */
export class Button extends Widget {
  constructor(port: Port = {}) {
    super(new ButtonContainer(port), [], port)
  }
}
