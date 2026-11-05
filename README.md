# ovidio

Web Components nativos + TypeScript + Vite + Tailwind + DaisyUI.

## Arranque

```bash
npm install
npm run dev
```

## Estructura

```
src/
  lib/       utilidades (signal, h)
  ux/        layout + slots (app-layout, section, card)
  ui/        componentes (clock, counter, …)
  pages/     home.html = composición anidada; home.ts = cableado
  main.ts
```

Composición en HTML (como Vue, pero nativo):

```html
<ui-section title="…">
  <ui-card title="…">
    <p>contenido</p>
  </ui-card>
</ui-section>
```
