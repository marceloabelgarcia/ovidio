import { Mother } from 'core/mother'
import { Port, TypePart, TriggerRelation, Action } from 'core/types'
import { HtmlNode } from '../../../core/html-container'
import { Widget } from 'core/widget'
import { actions } from '../../../core/types'


export const trigger = { action: actions.submit, state: 'finished' }

class InputContainer extends Mother {
    private name: string
    constructor(port: Port = {}) {
        const { name, type } = port.input as TypePart

        const input = document.createElement('input')

        input.className = 'input'
        input.type = type as string

        super(new HtmlNode(input), [], port)
        this.set(name, input.value)
        this.name = name
    }


    protected addListeners(action: Action, relation: TriggerRelation): void {
        const el = (this.host as HtmlNode).element as HTMLInputElement
        el.addEventListener(action.verb, () => {

            this.set(this.name, el.value)
            this.parent?.dispatched({
                event: {
                    trigger: relation.trigger,
                    time: new Date(),
                    target: el,
                },
                resource: {
                    type: this.name,
                    value: el.value,
                }
            })
        })
    }

}

export class Input extends Widget {
    constructor(port: Port = {}) {
        super(
            new InputContainer(
                {
                    ...port,
                    relations: [
                        {
                            trigger: { action: actions.change, state: 'finished' },
                            triggers: [
                                actions.change,
                                // actions.input
                            ],
                        },
                    ]
                }),
            [],
            port,
        )
    }
}
