import { Port } from 'core/types'
import { Widget } from 'core/widget'
import { childrenFromInputPort, levelPortFromInput } from './from-port'
import { InputsContainer } from './inputs-container'

export { SingleInput } from './single-input'
export { childrenFromInputPort, levelPortFromInput } from './from-port'

/**
 * Input de catálogo:
 * - port.input string | TypePart[] → SingleInput(s)
 * - trigger → output del nivel
 * - mother = InputsContainer (reparte execute a las hojas)
 */
export class Input extends Widget {
  constructor(port: Port = {}) {
    const level = levelPortFromInput(port)
    super(new InputsContainer(), childrenFromInputPort(level), level)
  }
}

