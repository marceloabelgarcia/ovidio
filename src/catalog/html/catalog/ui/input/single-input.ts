import { InputContainer } from './input-container'
import { Port } from 'core/types'
import { Widget } from 'core/widget'
import { FieldsetContainer } from './fieldset-container'

/** Un input hoja: mother = InputContainer. */
export class SingleInput2 extends Widget {
  constructor(port: Port = {}) {
    super(new InputContainer(port), [], port)
  }
}

export class SingleInput extends Widget {
  constructor(port: Port = {}) {
    super(new FieldsetContainer(port), [
      { child: SingleInput2, port }
    ], port)
  }
}