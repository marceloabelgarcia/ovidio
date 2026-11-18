import { TriggerRelation, Action, TypePart } from 'core/types'

export const actions: { [key: string]: Action } = {
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

export const output: TriggerRelation[] = [
        {
            trigger: { action: actions.modify, state: 'finished' },
            triggers: [actions.change],            
        },
        {
            trigger: { action: actions.save, state: 'finished' },
            triggers: [actions.submit],
        },
    ]
 
export const street: TypePart[] = [
    {
        name: 'name',
        type: 'string',
    },
    {
        name: 'door',
        type: 'number',
    },
]

export const address: TypePart[] = [
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