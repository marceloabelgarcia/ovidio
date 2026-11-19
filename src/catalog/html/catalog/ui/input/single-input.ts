import { InputContainer } from './input-container'
import { Port } from 'core/types'
import { Widget } from 'core/widget'

/** Un input hoja: mother = InputContainer. */
export class SingleInput extends Widget {
  constructor(port: Port = {}) {
    super(new InputContainer(port), [], port)
  }
}
