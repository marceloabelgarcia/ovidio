import { Action } from 'core/types'

/** Las palabras del formulario: las dice el sistema cuando un nivel traduce lo que pasó. */
export const actions: { [key: string]: Action } = {
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
