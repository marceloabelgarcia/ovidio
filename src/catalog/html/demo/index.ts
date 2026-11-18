import { ButtonContainer } from '../catalog/ui/button/'
import { DisplayContainer } from '../catalog/ui/display/'
import { InputContainer } from '../catalog/ui/input/'
import { AppContainer } from '../catalog/ux/app/app-container'
import { Widget } from 'core/widget'

/**
 * Nivel demo (Widget) cuya mother es AppContainer.
 */
export class Demo extends Widget {
    constructor(el: HTMLElement) {
        super(
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
            new AppContainer(el),
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
    }
}
