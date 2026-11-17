import { ButtonContainer } from '../ui/button/container'
import { DisplayContainer } from '../ui/display/container'
import { InputContainer } from '../ui/input/container'
import { Container } from 'core/container'
import { TypePart, Verb } from 'core/types'

const string = 'string'
const integer = 'integer'

const street: TypePart[] = [
    { name: 'name', type: string },
    { name: 'number', type: integer },
]

const change: Verb = {
    name: 'change',
    noun: 'user',
    gerund: 'changing',
    participle: 'changed',
}


const send: Verb = {
    name: 'send',
    noun: 'user',
    gerund: 'sending',
    participle: 'sent',
}

const saved: TypePart[] = [
    { name: 'saved', type: send.participle }
]


const modified: TypePart[] = [
    { name: 'changed', type: change.participle },
]

const output: TypePart[] = [
    { name: 'saved', type: saved },
    { name: 'modified', type: modified }
]

export class DemoContainer extends Container {
    constructor(parent: Container) {
        const button = new ButtonContainer()
        const display = new DisplayContainer(
            {
                input: street[0].name,
                trigger: "changed"
            })
        const input = new InputContainer({ input: street[0].name })
        parent.appendChild(button)
        parent.appendChild(display)
        parent.appendChild(input)

        // parent
        super([button, display, input], {
            input: street,
            output: output
        })
    }
}
