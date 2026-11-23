import { TriggerRelation, Action, TypePart, Relations, Trigger } from 'core/types'

export const actions: { [key: string]: Action } = {
    click: {
        verb: 'click',
        actor: 'user',
        progress: 'press',
        finished: 'released',
    },
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

export const trigger: Trigger = {
    action: {
        verb: 'change',
        actor: 'user',
        progress: 'changing',
        finished: 'changed',
    },
    state: 'finished',
}


export const relations: Relations = {
    triggers: [
        {
            trigger: { action: actions.parent, state: 'finished' },
            triggers: [actions.child],
        },
    ],
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