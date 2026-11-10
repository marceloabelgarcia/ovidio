import http from 'node:http'
import { Demo } from './demo'

const PORT = Number(process.env.PORT) || 8787

function page(host: unknown): string {
  const json = JSON.stringify(host, null, 2)
  return `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>ovidio server</title>
  <style>
    body { font: 16px/1.4 system-ui, sans-serif; margin: 2rem; background: #111; color: #eee; }
    code, pre { background: #1c1c1c; padding: 0.2em 0.4em; border-radius: 4px; }
    pre { padding: 1rem; overflow: auto; }
    a { color: #8cf; }
  </style>
</head>
<body>
  <h1>ovidio · server demo</h1>
  <p>Árbol <code>Widget(Container, [Leaf])</code> en Node. Recarga para volver a ejecutarlo.</p>
  <pre>${json.replace(/</g, '&lt;')}</pre>
  <p><a href="/">/</a> · <a href="/demo">/demo</a></p>
</body>
</html>`
}

const server = http.createServer((req, res) => {
  const path = (req.url ?? '/').split('?')[0]

  if (path === '/' || path === '/demo') {
    const demo = new Demo()
    const html = page(demo.host)
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
    res.end(html)
    return
  }

  res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' })
  res.end('not found')
})

server.listen(PORT, () => {
  console.log(`[server] http://127.0.0.1:${PORT}/`)
})
