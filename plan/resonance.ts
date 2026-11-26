import type { Plan } from './index'

/** La visión que guía el resto. No se implementa todavía: sirve para no decidir en contra de ella. */
export const plan: Plan = {
  title: 'Resonancia: el árbol es andamio',
  status: 'idea',
  updated: '2026-11-26',
  why: 'Hoy el árbol nace en la raíz y llega hasta las primitivas, y cada nivel se cablea con su receta. Es necesario así mientras se construyen el core y el catálogo, pero no es la forma final.',
  agreed: [
    'No va a existir un árbol armado: van a existir niveles de trabajo activos, aislados y distribuidos, quizás agrupados por cercanía.',
    'El flujo viaja por donde los ports lo permitan. Es la evolución de Matrix: hoy un trigger `changed` espera un `changed` despachado en su mismo nivel; después no hace falta la conexión explícita.',
    'Ejemplo: un `name` con padre `street` que espera un `change` resuena con otro que despachó `changed` y también tenía input `name`.',
    'Hoy los ports son 100% compatibles (coincidencia exacta). Con un catálogo amplio se van a medir por cercanía semántica.',
    'Ahí cobran fuerza el relato de la primitiva y el del catálogo. Para que haya coincidencias hace falta un catálogo mínimo.',
    'TypePart es central: cada catálogo, con sus demos, su data y sus types, alimenta sus ports.',
  ],
  proposed: [
    'Regla desde hoy: nada se direcciona por su posición en el árbol, todo por lo que es (su port, su TypePart). Así lo que se construya ahora sigue valiendo cuando el árbol ya no exista.',
    'Entre niveles aislados no viajan punteros: viajan la frase y el valor. Hoy la señal lleva la referencia a la caja; eso vale dentro de un proceso, no entre niveles distribuidos.',
    'Tres memorias por nivel: de trabajo (las celdas), episódica (el historial) y procedural (el cableado). La resonancia aprendida sería la procedural: plasticidad.',
  ],
  open: [
    'Qué despierta a un nivel dormido y dónde vive mientras duerme (ver history).',
    'Qué es "cercanía" para agrupar niveles.',
    'El ciclo de vida (el `mounted`, desmontar) pasa a ser activar y desactivar.',
  ],
  related: ['history', 'catalog', 'core'],
}
