import { TriggerRelation, Action, Trigger } from 'core/types'

/** El vocabulario del DOM: lo que sus sensores captan. Hoy `verb` es el nombre del evento. */
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
}

// Borradores, guardados como semilla del vocabulario (ver plan/catalog.ts).

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
