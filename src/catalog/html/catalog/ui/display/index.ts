import { OutputContainer } from '../../ux/output'
import { Port } from 'core/types'
import { Children } from 'core/mother'

import { Widget } from 'core/widget'

export class Display extends Widget {
  constructor(port: Port = {}) {

    const children: Children = port.input as Children ?? []
    super(new OutputContainer({
      ...port,
    }), [...children], port)
  }
}
