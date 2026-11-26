import type { Plan } from './index'

/** Cómo guarda cada nivel su historial y cómo persiste. Se retoma después del catálogo. */
export const plan: Plan = {
  title: 'Historial y persistencia por nivel',
  status: 'later',
  updated: '2026-11-26',
  why: 'Cada nivel deja el historial de lo que sucede, y los niveles tienen que poder persistir: hoy para volver a abrir la página con sus valores; con la resonancia, para que un nivel se duerma y se despierte.',
  agreed: [
    '"El único dato vivo vive en la primitiva": persistir valores es congelar celdas.',
    'Restaurar no es repetir el recorrido: es un freezing.',
    '"Nadie se entera si el nivel ya recuperó su data", y "la reactividad nace de la primitiva".',
    'En cada nivel hay un historial. El jefe y la madre cuentan el mismo suceso desde ángulos distintos.',
    'Display mira la celda (opción b): no espera una señal para mostrar.',
    'El medio (cookies, storage o backup en server) se decide en otro momento.',
    'Las preguntas abiertas esperan al catálogo: su orden va a revelar lo que nutre los ports y a dar identidad.',
  ],
  proposed: [
    'Identidad por lo que es, no por dónde está: una primitiva o un nivel se reconoce por su sustantivo (TypePart) dentro de su contexto de sustantivos, nunca por el camino en el árbol de widgets. El mismo `name` es `name` en DemoWidget y `street.name` dentro de address.',
    'Dos ejes, dos historias. La cadena deja relato en los niveles: la madre anota los hechos que entran a su `receive` y el jefe las frases que cuenta con `tell`, sin valores. La celda deja su línea de valores en la primitiva: cada escritura con su causa (captó, resonó, se descongeló) y una copia del valor de ese momento.',
    'Persistir un nivel es guardar sus historias bajo su identidad. Congelar no es una operación aparte: el valor congelado de una primitiva es la última línea de su historia de valores.',
    'Restaurar lo dispara la activación, no es automático: activarse es un hecho con dueño (el "primer mounted"). Hoy el dueño natural es `#app`, donde la realidad ya existe; después, lo que despierte al nivel. Con ese hecho cada primitiva escribe su última línea en su celda y proyecta. Nadie emite `changed`, y los relatos de los niveles vuelven como relato, sin cambiar comportamiento.',
    'El cableado y los directorios (`Boxes`) no se guardan: se rearman con los ports.',
    'Del core hacen falta solo dos cosas genéricas: que cada nivel anote y que la celda avise y anote. El medio y el dueño de la activación son catálogo.',
  ],
  open: [
    'Instancias: cómo se distinguen dos del mismo sustantivo con valores distintos (una lista de direcciones). ¿Lo dice la data con una parte que identifique, o sea, el TypePart?',
    'Niveles sin sustantivo de negocio (Row, Col, los paneles, HttpDemo, DemoWidget): el layout tiene su propio lenguaje (loading, sending, show, disabled). ¿Su identidad y lo que guardan se escriben en ese schema? ¿También con TypeParts?',
    '¿La primitiva guarda toda su línea de valores o solo un tramo? Un sensor de `input` anotaría cada tecla.',
    'Cuándo se escribe al medio: con cada línea o al salir.',
  ],
  related: ['live-cell', 'resonance', 'catalog', 'core', 'page', 'server'],
}
