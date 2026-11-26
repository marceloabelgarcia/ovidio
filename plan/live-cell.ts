import type { Plan } from './index'

/** Va después de ordenar el catálogo. */
export const plan: Plan = {
  title: 'La celda viva',
  status: 'later',
  updated: '2026-11-26',
  why: 'Con la opción b, lo que se muestra sale de la celda y no de la señal. Hoy la celda es un objeto plano: `set` asigna y nadie se entera, y el DOM guarda su propia copia. Si alguien la escribe desde afuera, por ejemplo al descongelar, el input sigue vacío.',
  agreed: [
    'Display mira la celda (b).',
    'La celda nunca emite: los hechos salen solo de lo que capta (sensores, fetch).',
    'Va después de ordenar el catálogo.',
  ],
  proposed: [
    'Cada primitiva que proyecta tiene su propia celda y proyecta desde ella, Display también. La señal y el descongelado solo escriben celdas. Con niveles aislados una vista no puede mirar la celda de otra primitiva. La señal puede seguir llevando la referencia: la primitiva copia el valor en su celda, como ya hace Input.',
    'Los dos Inputs `name` del demo se sincronizan por `changed`: es resonancia en chiquito, y cada uno conserva su celda. Se descarta "mismo sustantivo en el mismo nivel = misma celda".',
    '`InputContainer.execute` deja de escribir el DOM a mano: escribe la celda, y la celda hace proyectar.',
    'Separa las primitivas que muestran un valor (Display) de las que reaccionan a un suceso (Modal con `failed`, Get con `load`). Conviene que el orden del catálogo ya deje visible esa separación.',
  ],
  open: [
    'Las cajas que hoy se crean al vuelo: el error de Fetch, la del Button (con un elemento del DOM) y las de cada hijo de Fieldset.',
    'Valores compuestos: con celda propia, el desglose de Fieldset escribiría la celda de cada Display en vez de crear cajas al vuelo. ¿El desglose pasa a ser un mecanismo del core? (ver catalog)',
    'Nombres: la celda (hoy el tipo `Resource`) y el acto de mirar.',
  ],
  related: ['history', 'catalog', 'names'],
}
