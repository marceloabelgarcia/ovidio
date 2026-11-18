import { ButtonContainer } from '../catalog/ui/button/'
import { DisplayContainer } from '../catalog/ui/display/'
import { InputContainer } from '../catalog/ui/input/'
import { App } from '../catalog/ux/app/'
import { Widget } from 'core/widget'
import { street, actions, output, address } from './ports'

/**
 * Demo rellena el hueco de App (catálogo, sin hijos).
 *
 *   App (Widget)
 *     └── mother = AppContainer  ← hueco
 *           ├── Button
 *           ├── Display
 *           └── Input
 */
export class Demo extends Widget {
    constructor(el: HTMLElement) {
        super(
            [
                new ButtonContainer(),
                new DisplayContainer({
                    input: street[0].name,
                    trigger: { action: actions.change, state: 'finished' },
                }),
                new InputContainer({
                    input: street[0].name,
                }),
            ],
            new App(el),
            {
                input: address[0].name,
                output: output,
            },
        )
    }
}
