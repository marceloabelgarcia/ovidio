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
npm run dev          # frontend (Vite)
npm run dev:server   # backend (tsx)
```

Frontend demo: `/` o `/button`
