import { ButtonContainer } from '../catalog/ui/button/'
import { DisplayContainer } from '../catalog/ui/display/'
import { InputContainer } from '../catalog/ui/input/'
import { AppContainer } from '../catalog/ux/app/app-container'
import { View } from '../catalog/ux/view/'
import { Widget } from 'core/widget'

/**
 * Demo (Widget)
 *   └── mother = AppContainer
 *         └── ViewContainer (mother de View)
 *               ├── Button
 *               ├── Display
 *               └── Input
 */
export class Demo extends Widget {
    constructor(el: HTMLElement) {
        const view = new View(
            [
                new ButtonContainer(),
                new DisplayContainer({
                    input: 'name',
                    trigger: 'changed',
                }),
                new InputContainer({
                    input: 'name',
                }),
            ],
            {
                input: 'street',
                output: [
                    {
                        name: 'modified',
                        type: [{ name: 'changed', type: 'string' }],
                    },
                    {
                        name: 'saved',
                        type: [{ name: 'submitted', type: 'string' }],
                    },
                ],
            },
        )

        super([view.mother], new AppContainer(el))
    }
}
