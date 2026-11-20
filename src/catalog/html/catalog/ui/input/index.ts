import { Port } from 'core/types'
import { Widget } from 'core/widget'
import { childrenFromInputPort, levelPortFromInput } from './from-port'
import { View } from 'catalog/html/catalog/ux/view/'

export { SingleInput } from './single-input'
export { childrenFromInputPort, levelPortFromInput } from './from-port'

/**
 * Input de catálogo:
 * - port.input string | TypePart[] → SingleInput(s)
 * - TypePart.type = TypePart[] → Input anidado (recursividad)
 * - trigger → output del nivel
 * - mother = FieldsetContainer (host entre legend y <p>)
 */
export class Input extends Widget {
  constructor(port: Port = {}) {
    const level = levelPortFromInput(port)
    super(new View(), childrenFromInputPort(level, Input), level)
  }
}

