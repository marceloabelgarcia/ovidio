import type { Plan } from './index'

/** "Los nombres son importantes, ya que me identifican, me dan entendimiento." */
export const plan: Plan = {
  title: 'Nombres',
  status: 'open',
  updated: '2026-11-26',
  why: 'Los nombres los decide el usuario. Los que eligió Claude son provisorios hasta que él los confirme.',
  agreed: [
    'El modelo nació de una mezcla clarificadora: father y mother, jefe, lugar, obreras (las primitivas).',
    'Sufijo `Container` para los lugares.',
    '`sense` en lugar de `listen`: es un sensor, donde un mundo se transforma en otro.',
  ],
  proposed: [
    'Que se lean en pares: `sense`/`emit` para la realidad; el encargo y `tell` para la gramática.',
    'La caja como "celda" y `Boxes` como el directorio del nivel. O un par, con el historial: memoria de valores y memoria de sucesos.',
  ],
  open: [
    '`parent`: ¿father, jefe, boss? `children` va en par.',
    '`Output`: ¿Signal, Phrase?',
    '`Event`: choca con el `Event` del DOM.',
    'Provisorios de Claude: `receive`, `tell`, `wire`, `distribute`, `exits`, `Boxes`. Y `appendChildren`, que en el modelo es "dar a luz".',
    'La caja: hoy el tipo `Resource`. `Boxes`: ¿Resources, Memory, Refs, directorio?',
    'Una sola metáfora para el código: hoy conviven familia, trabajo, biología y computadora.',
    'Los de esta carpeta: `Plan`, `Status`, los campos y los archivos.',
  ],
  related: ['core', 'live-cell', 'history'],
}
