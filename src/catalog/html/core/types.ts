import { TriggerRelation, Action, Trigger } from 'core/types'

export const actions: { [key: string]: Action } = {
    input: {
        verb: 'input',
        actor: 'user',
        progress: 'inputting',
        finished: 'inputted',
    },
    click: {
        verb: 'click',
        actor: 'user',
        progress: 'press',
        finished: 'released',
    },
    change: {
        verb: 'change',
        actor: 'user',
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


export const relations: TriggerRelation[] =  [
        {
            trigger: { action: actions.parent, state: 'finished' },
            triggers: [{ action: actions.child, state: 'finished' }],
        },
    ]


export const output: TriggerRelation[] = [
    {
        trigger: { action: actions.modify, state: 'finished' },
        triggers: [{ action: actions.change, state: 'finished' }],
    },
    {
        trigger: { action: actions.save, state: 'finished' },
        triggers: [{ action: actions.submit, state: 'finished' }],
    },
]