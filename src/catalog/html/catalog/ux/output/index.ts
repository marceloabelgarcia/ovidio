import { Mother } from 'core/mother'
import { HtmlNode } from '../../../core/html-container'
import { Event as CoreEvent, Resource, Port, Trigger } from 'core/types'



export class OutputContainer extends Mother {
    constructor(port: Port = {}) {
        const output = document.createElement('div')
        output.className = 'border border-gray-300 rounded-md p-2 h-20'

        const initial = port.input as string ?? 'HOLA MUNDO'
        if (typeof initial === 'string') {
            output.textContent = initial
        } else {
            output.appendChild(initial)
        }


        super(new HtmlNode(output))
    }


    show(content?: unknown): void {

    }
}




