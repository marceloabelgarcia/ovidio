import { OutputContainer } from '../../ux/output'
import { Port } from 'core/types'
import { Widget } from 'core/widget'


export class DisplayContent extends Widget {
  constructor(port: Port = {}) {
    super(new OutputContainer(port), [], port)
  }
}

export class Display extends Widget {
  constructor(port: Port = {}) {
    
    super(new OutputContainer(port), [
      { child: DisplayContent, port },
    ], port)
  }
}
