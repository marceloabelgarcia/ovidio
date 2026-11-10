# ovidio

Gramática Widget / Mother reutilizable en frontend y backend.

```
src/
  core/              # portable (sin DOM): Widget, Mother, withInterior
  frontend/
    dom/             # attach → HTMLElement / #app
    demo/            # ejemplo de widgets HTML
  app/               # entrada Vite (browser)
  server/            # Node + TS (tsx); demo lógico
```

Alias: `~/…` → `src/…`

```bash
npm install
npm run dev          # frontend → http://127.0.0.1:5173/
npm run dev:server   # backend  → http://127.0.0.1:8787/
```

- Frontend demo: `/` o `/button`
- Server demo: `http://127.0.0.1:8787/` (o `/demo`)
