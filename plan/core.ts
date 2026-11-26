import type { Plan } from './index'

/** Preguntas abiertas del core: ninguna bloquea, pero cambian cómo se lee. */
export const plan: Plan = {
  title: 'Decisiones abiertas del core',
  status: 'open',
  updated: '2026-11-26',
  why: 'El core quedó ordenado (lo vertical es del jefe, lo horizontal del lugar, una Matrix por nivel), pero quedan preguntas de gramática y de flujo.',
  agreed: [
    '"El port siempre es input, trigger, relations."',
    '"No quiero romper mi core." Los conceptos nuevos se diseñan juntos antes de escribir código.',
    '"No hay que inventar más nada de core, solo ir ajustando cosas que sean genéricas."',
    '"No es cuestión de automatizar la carga": algo automático necesita un trigger con dueño. Quizás una primitiva que haga el primer `mounted`; todavía no se inventa.',
  ],
  proposed: [
    'El arco reflejo inclina el flujo hacia la opción b: lo local se resuelve local.',
  ],
  open: [
    'Flujo innecesario: lo que nadie relata hoy sube hasta la raíz (a). b: se queda en su nivel. c: sube solo si alguien arriba lo espera.',
    'Un widget espera un solo `trigger`. Un botón que se deshabilita y se habilita necesita dos órdenes; un layout reacciona a varios estados.',
    '`execute` recibe hechos y órdenes (el Modal reacciona a `failed`, Get a la orden `load`): ¿se lee como "actuá" o como "obedecé"?',
    'Ciclo de vida: el `mounted`, y desmontar. Hoy navegar es recargar la página. La persistencia lo necesita para restaurar (ver history).',
    '`Widget` admite nacer sin lugar (`mother: Mother | null`) y nadie lo usa. Si el lugar fuera obligatorio, se van los `?.` y el `!`.',
    '`tell(sentence, output)` solo usa `output.resource`.',
  ],
  related: ['resonance', 'history', 'names', 'page'],
}
