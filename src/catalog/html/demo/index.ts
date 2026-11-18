import { ButtonContainer } from '../catalog/ui/button/'
import { DisplayContainer } from '../catalog/ui/display/'
import { InputContainer } from '../catalog/ui/input/'
import { App } from '../catalog/ux/app/'

/**
 * App (Widget) → mother = AppContainer → hijos de la demo.
 */
export function Demo(el: HTMLElement): void {
    new App(
        el,
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
}
