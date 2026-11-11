import { Widget, type Port } from '~/core'
import { Ux } from './ux'

/** Catálogo work — viaje (máquina en la carcasa). */
export class Fetch extends Widget {
  constructor(port: Port = {}) {
    super(Ux, [], port)
  }
}
