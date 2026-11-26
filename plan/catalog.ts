import type { Plan } from './index'

/** La etapa en curso. */
export const plan: Plan = {
  title: 'Etapa de catálogos',
  status: 'now',
  updated: '2026-11-26',
  why: 'Ordenar y agrupar los catálogos para que los tipos y la data de las demos muestren el modelo: la primitiva como obrera con su capacidad, y cada nivel con su sustantivo y su verbo. Es también el catálogo mínimo que la resonancia necesita para encontrar coincidencias.',
  agreed: [
    'Va antes de la celda viva y del historial: "el orden va a revelar lo que nutre los ports, y esa agrupación va a aportar identidad".',
    'Cada catálogo con sus demos, su data y sus types: lo que alimenta sus ports.',
    'TypePart son definiciones de a pares, el nodo y sus hijos: address tiene street; street tiene name y door. `name` es libre: cualquier padre puede tener el suyo. Una parte hoja (string) llega a la primitiva.',
    'Layouts y formularios se construyen con desglose de datos.',
    'El layout no conoce de address: conoce de loading, sending, show, disabled, enabled. Tiene su propio lenguaje, un schema.',
    'Una clase `Sensor` en `html/core`, junto a su vocabulario y sus relations.',
    'La capacidad de cada primitiva como frase ("el usuario puede cambiar el valor de un campo"): el chunk que después tendrá su embedding.',
  ],
  proposed: [
    'Primer paso, sin tocar código: un inventario de cada pieza. Qué nutre cada port (input: TypePart, texto, ruta o elemento; trigger; relations), qué captura o proyecta, y en qué mundo habla (negocio con TypePart, layout con su schema, o la realidad: DOM, red). De esa tabla salen los grupos.',
    'Mientras se ordena, no rehacer los internos de Display, Input y Fieldset: eso lo cambia la celda viva.',
    'Clasificar cada pieza como captura, proyección o las dos (receptores y efectores; las matrices son los circuitos). Input captura y proyecta; Fetch actúa sobre la red y captura la respuesta.',
    'Que la capacidad declare los sensores y las relations solo traduzcan. La relation identidad de Input (`changed` → `changed`) existe solo para encender su sensor.',
    'El out de cada nivel es su propia palabra: HttpDemo no repetiría "falló", diría algo como "no se pudo cargar el formulario".',
    'Componer hacia arriba (un formulario arma su valor con el de sus inputs), el camino inverso al desglose. Ponerlo primero, junto con la decisión del flujo (ver core).',
    'Todo nivel que trabaja tiene su sustantivo, de negocio o de layout: hoy DemoWidget y HttpDemo no tienen TypePart (ver history).',
  ],
  open: [
    'El desglose por TypePart: ¿otro mecanismo del core junto a la matriz? Hoy Fieldset lo hace a mano y rodea la matriz.',
    'La primitiva atada a un TypePart: seis clases sacan `name` de `port.input` (Input, InputContainer, Get, FetchContainer, OutputContainer, Fieldset) y tres `execute` repiten el filtro `ref.type !== this.name`.',
    'Button: su contenido está fijo ("Click me", "HOLA", el div) en vez de salir de `port.input`; su caja lleva un elemento del DOM, y `button` no es un TypePart.',
    'Vocabulario de tipos: ¿`Action = Record<State, string>`, sin firma de índice? ¿`Verb` queda como documentación de las formas o se va?',
    'Borradores de `html/core/types`, guardados como semilla del vocabulario: `trigger`, `relations` (roto: usa `actions.parent` y `actions.child`, que no existen) y `output`.',
    'Hoy `action.verb` tiene que coincidir con el nombre del evento del DOM.',
    '`ui/` (widgets) y `ux/` (lugares): revisar la división.',
    'Slots: en qué zona de la carcasa vive cada obrero (el modal tiene caja y acciones; el layout, header y main). Hoy `append` cuelga todo en la raíz.',
    'Menores: lugares del demo sin port (`new Row()`, `new Col()`); `OutputContainer.show` tipado `HTMLElement` pero maneja `Text`; el README describe una estructura vieja.',
  ],
  related: ['live-cell', 'core', 'history', 'resonance', 'names'],
}
