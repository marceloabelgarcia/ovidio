PROPUESTA 1:
Yo definiría dos contratos fundamentales en TypeScript: Fetch (descendente) y Emit (ascendente).

No necesitas Vue, React, observers ni clases. Son funciones explícitas.

## 1. FETCH — comunicación descendente

El padre entrega información al hijo. El hijo expone una función que permite recibirla.

```
export type Fetch<T> = (value: T) => void
```

Una primitiva OUTPUT:

```
export function Output<T>(props: {
  value: T
}) {
  let value = props.value

  return {
    fetch: (newValue: T) => {
      value = newValue
    },

    read: () => value
  }
}
```

El padre puede ejecutar:

```
output.fetch(newAddress)
```

## 2. EMIT — comunicación ascendente

El hijo emite un acontecimiento hacia su padre.

```
export type Emit<E> = (event: E) => void
```

Una primitiva INPUT:

```
export function Input<T>(props: {
  value: T
  emit: Emit<Change<T>>
}) {
  return {
    changed: (value: T) => {
      props.emit({
        verb: 'changed',
        value
      })
    }
  }
}
```

Contrato del acontecimiento:

```
export type Change<T> = {
  verb: 'changed'
  value: T
}
```

## 3. Cómo se conectan

INPUT

changed(value)

EMIT

Hacia el padre

PARENT / INTERPRETER

Interpreta y propaga

FETCH

Hacia el hijo

OUTPUT

fetch(newValue)

## 4. Y lo importante: los contratos son independientes del entorno

En Vue:

- `emit` puede conectarse a `$emit` o a una función callback.
- `fetch` puede invocar directamente la función expuesta por el componente.

En Node:

- `emit` es una función que recibe el acontecimiento.
- `fetch` es una función que recibe el valor.

No necesitas implementar dos sistemas distintos.

## Mi propuesta de nomenclatura

| Contrato   | Dirección    | Función                  |
| ---------- | ------------ | ------------------------ |
| `Fetch<T>` | Padre → hijo | Entrega información      |
| `Emit<E>`  | Hijo → padre | Comunica acontecimientos |

Y mantendría una regla: Fetch transporta valores; Emit transporta acontecimientos.

Esta separación me parece una base muy limpia para tu gramática. Más adelante podrás introducir `execute` para ACTION, sin confundirlo con los otros dos mecanismos.



PROPUESTA 2:
Yo haría dos contratos de primitivas en TypeScript, independientes de Vue:

1. Primitiva descendente: ofrece funciones que el Father puede ejecutar.
2. Primitiva ascendente: produce acontecimientos que entrega a su Father.

La diferencia es quién inicia la comunicación.

## 1. Contrato común de acontecimientos

`types.ts`

```
export type Event = {
  verb: string
  type?: string
  value?: unknown
}

export type Emit = (event: Event) => void

export type Trigger = (event?: Event) => void
```

## 2. Primitiva descendente: Fetch

Fetch ofrece una función a su Father. No decide cuándo ejecutarla.

`Fetch.ts`

```
import type { Event, Trigger } from './types'

export class Fetch {
  triggers: Record<string, Trigger>

  constructor() {
    this.triggers = {
      submitted: this.submitted
    }
  }

  private async submitted(event?: Event) {
    console.log('Ejecutando Fetch', event)

    // fetch.send()
  }
}
```

El Father recibe sus funciones:

```
const fetch = new Fetch()

// El Father registra la función:
father.subscribe('submitted', fetch.triggers.submitted)

// Cuando llega el acontecimiento:
father.trigger('submitted')
```

Dirección descendente

```
Father
  │
  │ submitted()
  ▼
Fetch
  │
  ▼
fetch.send()
```

## 3. Primitiva ascendente: Button

Button no ofrece una función al Father. Él mismo produce un acontecimiento.

`Button.ts`

```
import type { Emit } from './types'

export class Button {
  constructor(private emit: Emit) {}

  click() {
    this.emit({
      verb: 'submitted',
      type: 'form'
    })
  }
}
```

Al construirlo:

```
const button = new Button(event => {
  father.receive(event)
})
```

Cuando el usuario pulsa:

```
button.click()
```

Dirección ascendente

```
Button
  │
  │ emit(submitted)
  ▼
Father
  │
  ▼
Suscriptores de submitted
```

## 4. El espejo completo

ASCENDENTE

Button

`emit(event)`

Father

`receive(event)`

DESCENDENTE

Father

`trigger('submitted')`

Fetch

`submitted()`

## 5. ¿Y Vue?

Vue simplemente implementa el contrato ascendente mediante `defineEmits`.

Por ejemplo, tu Button podría hacer:

```
const emit = defineEmits<{
  dispatch: [event: Event]
}>()

function click() {
  emit('dispatch', {
    verb: 'submitted',
    type: 'form'
  })
}
```

Y `Widget.vue` traduce ese emit a `father.receive(event)`.

Para el descendente, el Father conserva la función de Fetch y la ejecuta cuando corresponde. No necesita utilizar `defineExpose` ni referencias Vue si las funciones se registran durante la construcción de las instancias.

La distinción que conservaría en tu catálogo:

| Primitiva        | Expone                 | Dirección |
| ---------------- | ---------------------- | --------- |
| Button / Action  | `emit(event)`          | Sube      |
| Input / Changer  | `emit(changed)`        | Sube      |
| Fetch / Sender   | `triggers.submitted()` | Baja      |
| String / Display | Recibe `value`         | Baja      |

Y aquí hay algo importante: String no necesita emitir nada porque es un display pasivo.

Así tienes una gramática mínima de comunicación: unos nodos producen acontecimientos; otros ofrecen funciones ejecutables. Father conecta ambos mundos.