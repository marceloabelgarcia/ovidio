import { Button } from '../catalog/ui/button/'
import { Display } from '../catalog/ui/display/'
import { Input } from '../catalog/ui/input/'
import { View } from '../catalog/ux/view/'
import { Port } from 'core/types'
import { Widget } from 'core/widget'
import { street, actions, output, address } from './ports'

/** StreetView: solo declara; mother = View; hijos = Widgets. */
export class StreetView extends Widget {
  constructor(
    port: Port = {
      input: address[0].name,
      output: output,
    },
  ) {
    super(
      new View(),
      [
        {
          child: Input,
          port: {
            input: address[0],
            trigger: {
              action: actions.change,
              state: 'finished',
            },
          },
        },
        {
          child: Display,
          port: {
            input: address[0],
            trigger: { action: actions.change, state: 'finished' },
          },
        },
        { child: Button },
        {
          child: Input,
          port: {
            input: address[0],
            trigger: {
              action: actions.change,
              state: 'finished',
            },
          },
        }, 
      ],
      port,
    )
  }
}
