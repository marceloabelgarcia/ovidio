# ovidio

Gramática Widget / Mother. Catálogo semántico + app runtime.

```
src/
  core/                 # invariante: Widget, Mother, Matrix
  catalog/
    html/core/          # frontera con el DOM: HtmlContainer y su vocabulario
    http/core/          # frontera con la red: HttpContainer y su vocabulario
    app/                # catálogo para construir apps
    form/               # catálogo para construir formularios
  app/                  # runtime (enciende)
```

Cada catálogo tiene siempre las mismas carpetas:

```
types/      input: los sustantivos (TypePart, de a pares)
data/       input: los valores que los llenan
triggers/   trigger: las acciones y sus formas
relations/  relations: las frases que traducen
primitive/  las piezas que no pueden tener nada dentro (input, display, get)
slot/       las que pueden (fieldset, button, modal, col, row…)
example/    un nivel: un padre y sus hijos
```

Cada pieza es una carpeta: `index.ts` (el widget) y `container.ts` (su lugar).

```bash
npm install
npm run dev          # http://127.0.0.1:5173/
npm run dev:server   # http://127.0.0.1:8787/
```
