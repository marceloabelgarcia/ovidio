import { Mother } from 'core/mother'
import { HtmlNode } from '../../../core/html-container'
import { Event as CoreEvent, Resource, Port, Trigger } from 'core/types'



export class ButtonContainer extends Mother {
    constructor(port: Port = {}) {
        const button = document.createElement('button')
        button.textContent = 'Click me'
        button.className = 'btn btn-primary'

        button.addEventListener('click', ($event: Event) => {

            const event: CoreEvent = {
                trigger: port.input as Trigger,
                time: new Date(),
                target: $event.target,
            }

            const resource: Resource = {
                type: 'button',
                value: $event.target,
            }

            this.dispatched({ event, resource })
        })


        super(new HtmlNode(button))
    }
}
