// Prueba en Chrome, sin ventana, de las rutas del demo: /, /http y /nada.
// Necesita el servidor de Vite corriendo (npm run dev) y google-chrome instalado.
//
// Uso, desde la raíz del repo:
//   node scripts/verify/routes.mjs | diff - scripts/verify/routes.expected.txt
// Con otra URL base: node scripts/verify/routes.mjs http://localhost:5173
//
// Qué muestra cada ruta:
//   /      el árbol montado; al escribir 'Ana' en el primer input, el otro input `name` y el Display la muestran
//   /http  tras el click: las outputs del Fieldset con la dirección, y el Modal abierto con el error de 'zip'
//   /nada  el aviso del router y ninguna página montada
//   todas  "errores: ninguno"
// La captura de /http queda en una carpeta temporal; su ruta sale por stderr para no ensuciar el diff.
import { spawn } from 'node:child_process'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const base = process.argv[2] ?? 'http://localhost:5173'
try {
  await fetch(base)
} catch {
  console.error(`No responde ${base}: levantá el servidor con \`npm run dev\`.`)
  process.exit(1)
}

const dir = mkdtempSync(join(tmpdir(), 'ovidio-verify-'))
const chrome = spawn('google-chrome', ['--headless=new', '--disable-gpu', '--no-sandbox', '--remote-debugging-port=9334',
  `--user-data-dir=${join(dir, 'profile')}`, '--window-size=1280,900', 'about:blank'], { stdio: 'ignore' })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let list
for (let i = 0; i < 50; i++) { try { list = await (await fetch('http://127.0.0.1:9334/json/list')).json(); if (list.length) break } catch {} await sleep(200) }
if (!list?.length) {
  console.error('Chrome no abrió su puerto de depuración (9334).')
  chrome.kill()
  process.exit(1)
}
const ws = new WebSocket(list.find((t) => t.type === 'page').webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))
let id = 0; const pending = new Map(); let logs = []; let errors = []
ws.onmessage = ({ data }) => {
  const m = JSON.parse(data)
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m.result); pending.delete(m.id) }
  if (m.method === 'Runtime.consoleAPICalled') logs.push(m.params.type + ': ' + m.params.args.map((a) => a.value ?? a.description ?? a.className).slice(0, 2).join(' '))
  if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description ?? m.params.exceptionDetails.text)
}
const send = (method, params = {}) => new Promise((r) => { const i = ++id; pending.set(i, r); ws.send(JSON.stringify({ id: i, method, params })) })
const ev = async (expr) => (await send('Runtime.evaluate', { expression: expr, returnByValue: true, awaitPromise: true })).result.value
await send('Runtime.enable'); await send('Page.enable')

const tree = `(() => {
  const app = document.querySelector('#app'); const r = app.firstElementChild
  return {
    appKids: app.children.length, router: r?.className, routerKids: r?.children.length,
    inputs: document.querySelectorAll('input').length, fieldsets: document.querySelectorAll('fieldset').length,
    buttons: document.querySelectorAll('button.btn-primary').length, dialogs: document.querySelectorAll('dialog').length,
  }})()`

for (const path of ['/', '/http', '/nada']) {
  logs = []; errors = []
  await send('Page.navigate', { url: base + path })
  await sleep(2000)
  console.log(path.padEnd(6), JSON.stringify(await ev(tree)), '| warn:', logs.filter((l) => l.startsWith('warning')).join(' ') || '-', '| errores:', errors.length ? errors : 'ninguno')
  if (path === '/') {
    await ev(`(() => { const i = document.querySelectorAll('input')[0]; i.value = 'Ana'; i.dispatchEvent(new Event('change')) })()`)
    await sleep(300)
    console.log('   input1=Ana →', JSON.stringify(await ev(`({ inputs: [...document.querySelectorAll('input')].map(i => i.value), display: [...document.querySelectorAll('output')].map(o => o.textContent) })`)))
  }
  if (path === '/http') {
    await ev(`document.querySelector('button.btn-primary').click()`)
    await sleep(800)
    console.log('   click →', JSON.stringify(await ev(`({
      outputs: Object.fromEntries([...document.querySelectorAll("fieldset output")].map(o => [o.name, o.textContent])),
      dialog: document.querySelector('dialog.modal')?.open, msg: document.querySelector('dialog.modal p')?.textContent })`)))
    const shot = await send('Page.captureScreenshot', { format: 'png' })
    writeFileSync(join(dir, 'http.png'), Buffer.from(shot.data, 'base64'))
  }
}

ws.close(); chrome.kill()
await sleep(300)
rmSync(join(dir, 'profile'), { recursive: true, force: true })
console.error('captura de /http:', join(dir, 'http.png'))
