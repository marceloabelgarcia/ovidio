import { ButtonContainer } from '../catalog/ui/button/'
import { DisplayContainer } from '../catalog/ui/display/'
import { InputContainer } from '../catalog/ui/input/'
import { AppContainer } from '../catalog/ux/app/app-container'
import { View } from '../catalog/ux/view/'
import { Widget } from 'core/index'
import { TriggerRelation, Action, TypePart } from 'core/types'


const actions: { [key: string]: Action } = {
    change: {
        verb: 'change',
        actor: 'system',
        progress: 'changing',
        finished: 'changed',
    },
    save: {
        verb: 'save',
        actor: 'system',
        progress: 'saving',
        finished: 'saved',
    },
    submit: {
        verb: 'submit',
        actor: 'system',
        progress: 'submitting',
        finished: 'submitted',
    },
    modify: {
        verb: 'modify',
        actor: 'system',
        progress: 'modifying',
        finished: 'modified',
    },
}

const output: TriggerRelation[] = [
        {
            trigger: { action: actions.modify, state: 'finished' },
            triggers: [actions.change],            
        },
        {
            trigger: { action: actions.save, state: 'finished' },
            triggers: [actions.submit],
        },
    ]
 
const street: TypePart[] = [
    {
        name: 'name',
        type: 'string',
    },
    {
        name: 'door',
        type: 'number',
    },
]

const address: TypePart[] = [
    {
        name: 'street',
        type: street,
    },
    {
        name: 'city',
        type: 'string',
    },
    {
        name: 'state',
        type: 'string',
    },
    {
        name: 'zip',
        type: 'string',
    },
]
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
                    input: street[0].name,
                    trigger: { action: actions.change, state: 'finished' },
                }),
                new InputContainer({
                    input: street[0].name,
                }),
            ],
            {
                input: address[0].name,
                output: output,
            },
        )

        super([view.mother], new AppContainer(el))
    }
}
