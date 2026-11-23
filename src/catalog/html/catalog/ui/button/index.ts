import { ButtonContainer } from '../../ux/button'
import { Port } from 'core/types'

import { Widget } from 'core/widget'

export class Button extends Widget {
  constructor(port: Port = {}) {

    super(new ButtonContainer({
      ...port,
      input: {
        action: {
          verb: 'click',
          actor: 'user',
          progress: 'press',
          finished: 'released',
        },
        state: 'finished',
      },
    }), [], port)
  }
}
