import { ButtonContainer } from '../catalog/ui/button/'
import { DisplayContainer } from '../catalog/ui/display/'
import { InputContainer } from '../catalog/ui/input/'
import { AppContainer } from 'catalog/html/core/app-container'
import { Widget } from 'core/widget'

/**
 * Widget (nivel raíz)
 *   └── mother = AppContainer   ← primera mother, nace el runtime
 *         ├── Button
 *         ├── Display
 *         └── Input
 */
export function Demo(el: HTMLElement): void {
    const app = new AppContainer(el)

    new Widget(
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
        app,
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
