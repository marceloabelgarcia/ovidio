import { Widget, type Port } from '~/core'
import { Fetch } from '../fetch'
import { Ux } from './ux'

/**
 * Get combina Fetch: aquí se ve el `new Fetch`.
 * Mother solo lo ejecuta cuando Get ya está en el level (padre correcto).
 *
 * Ports del Fetch:
 * — input: el mismo predicado que Get (name, …) → values[type]
 * — trigger: el mismo verbo que despierta a Get (port.trigger), no hardcode
 */
export class Get extends Widget {
  constructor(port: Port = {}) {
    super(
      Ux,
      [
        {
          create: () =>
            new Fetch({
              input: port.input,
              trigger: port.trigger,
            }),
        },
      ],
      port,
    )
  }
}
