import type { Plan } from './index'

export const plan: Plan = {
  title: 'Server Node',
  status: 'later',
  updated: '2026-11-26',
  why: 'Después de la etapa de catálogos, que ovidio corra también en backend con Node.',
  agreed: [
    'Por ahora no preocuparse por el server.',
  ],
  proposed: [
    'Antes del server: sacar `HTMLElement` de los tipos del core (`Port.input` es la única referencia al DOM que queda) y resolver la caja del Button, que lleva un elemento del DOM.',
    'Las identidades por TypePart (ver history) son las que sirven para guardar en el server: no dependen de un árbol armado en el cliente.',
  ],
  open: [
    'El medio para persistir: cookies, storage o backup en server.',
    'El script `dev:server` y el README apuntan a `src/server/main.ts`, que hoy no existe.',
  ],
  related: ['history', 'catalog'],
}
