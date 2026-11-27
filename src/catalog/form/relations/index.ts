import { TriggerRelation } from 'core/types'
import { actions } from 'catalog/html/core/types'
import { actions as form } from '../triggers'

/** Borrador, guardado como semilla: las frases del formulario (cambió → modificado, enviado → guardado). */
export const output: TriggerRelation[] = [
    {
        trigger: { action: form.modify, state: 'finished' },
        triggers: [{ action: actions.change, state: 'finished' }],
    },
    {
        trigger: { action: form.save, state: 'finished' },
        triggers: [{ action: form.submit, state: 'finished' }],
    },
]
