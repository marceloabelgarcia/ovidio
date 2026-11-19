import { DisplayContainer } from './display-container'
import { Port } from 'core/types'
import { Widget } from 'core/widget'

/** Display de catálogo: mother = DisplayContainer. */
export class Display extends Widget {
  constructor(port: Port = { input: 'name' }) {
    super(new DisplayContainer(port), [], port)
  }
}
