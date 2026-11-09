import type { Verb, VerbInfinitive } from './types'

export type { Verb, VerbInfinitive } from './types'

/**
 * Prototipo mínimo: familias que ya usa el catálogo de widgets
 * (Edit / Save / Submit / Input) y el panel de editor (add / modify / remove).
 *
 * Regular: past === pastParticiple. Irregulares futuros se declaran igual,
 * con past ≠ pastParticiple cuando haga falta.
 */

/** Campo de dato: el DOM ya es la primitiva; el relato cierra en `changed`. */
const change: Verb = {
  infinitive: 'change',
  presentParticiple: 'changing',
  past: 'changed',
  pastParticiple: 'changed',
}

/** Disparo de formulario (Submit → Fetch espera `submitted`). */
const submit: Verb = {
  infinitive: 'submit',
  presentParticiple: 'submitting',
  past: 'submitted',
  pastParticiple: 'submitted',
}

/** Persistencia (Fetch / nivel Save cierra en `saved`). */
const save: Verb = {
  infinitive: 'save',
  presentParticiple: 'saving',
  past: 'saved',
  pastParticiple: 'saved',
}

/** Arranque de una primitiva de ingreso (p.ej. config.input). */
const init: Verb = {
  infinitive: 'init',
  presentParticiple: 'initializing',
  past: 'inited',
  pastParticiple: 'initialized',
}

/** Configuración entregada a Services. */
const configure: Verb = {
  infinitive: 'configure',
  presentParticiple: 'configuring',
  past: 'configured',
  pastParticiple: 'configured',
}

/** Intenciones de editor (dueños de acción por encima de Edit). */
const add: Verb = {
  infinitive: 'add',
  presentParticiple: 'adding',
  past: 'added',
  pastParticiple: 'added',
}

const modify: Verb = {
  infinitive: 'modify',
  presentParticiple: 'modifying',
  past: 'modified',
  pastParticiple: 'modified',
}

const remove: Verb = {
  infinitive: 'remove',
  presentParticiple: 'removing',
  past: 'removed',
  pastParticiple: 'removed',
}

/** Abortar una intención del panel (Cancel). */
const cancel: Verb = {
  infinitive: 'cancel',
  presentParticiple: 'cancelling',
  past: 'cancelled',
  pastParticiple: 'cancelled',
}

const VerbCatalog: Record<VerbInfinitive, Verb> = {
  change,
  submit,
  save,
  init,
  configure,
  add,
  modify,
  remove,
  cancel,
}

/** Cualquier forma flexionada → familia (para emparejar ports y frames). */
const byForm: Record<string, Verb> = Object.fromEntries(
  Object.values(VerbCatalog).flatMap((verb) => {
    const forms = [
      verb.infinitive,
      verb.presentParticiple,
      verb.past,
      verb.pastParticiple,
    ]
    return [...new Set(forms)].map(form => [form, verb])
  }),
)

function of(token: string): Verb | undefined {
  return byForm[token] ?? VerbCatalog[token]
}

function infinitiveOf(token: string): string | undefined {
  return of(token)?.infinitive
}

/** En curso — frame continuo del historial. */
function presentParticipleOf(token: string): string | undefined {
  return of(token)?.presentParticiple
}

/** Cierre / espera entre hermanos — `port.trigger`. */
function pastParticipleOf(token: string): string | undefined {
  return of(token)?.pastParticiple
}

function pastOf(token: string): string | undefined {
  return of(token)?.past
}

export {
  VerbCatalog,
  change,
  submit,
  save,
  init,
  configure,
  add,
  modify,
  remove,
  cancel,
  of,
  infinitiveOf,
  presentParticipleOf,
  pastOf,
  pastParticipleOf,
}
