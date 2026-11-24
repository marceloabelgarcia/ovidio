import { Mother } from 'core/mother'
import { HtmlNode } from '../../../core/html-container'
import { Port, TriggerRelation, Action } from 'core/types'


export class ButtonContainer extends Mother {
    constructor(port: Port = {}) {
        const button = document.createElement('button')
        button.textContent = 'Click me'
        button.className = 'btn btn-primary'
        
        super(new HtmlNode(button), [], port)
    }

    protected addListeners(action: Action, relation: TriggerRelation): void {
        const el = (this.host as HtmlNode).element as HTMLInputElement
        el.addEventListener(action.verb, ($event) => {
 
            this.dispatched({
                event: {
                    trigger: relation.trigger,
                    time: new Date(),
                    target: el,
                },
                resource: {
                    type: "button",
                    value: $event.target,
                }
            })
        })
    }

}
