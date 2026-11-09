import '~/catalogs/ui/input'
import type { Input } from '~/catalogs/ui/input'

/**
 * Banco de pruebas del widget estático ui/input.
 * Ruta: /input
 */
export function InputLabPage(): HTMLElement {
  const wrap = document.createElement('div')
  wrap.className = 'p-8 max-w-md space-y-4'

  const title = document.createElement('h1')
  title.className = 'text-xl font-semibold'
  title.textContent = 'lab · ui/input'

  const hint = document.createElement('p')
  hint.className = 'text-sm opacity-70'
  hint.textContent =
    'Nivel (Widget) + Mother/Resources/Father. UX trae el HTML. Sensor → changed.'

  const log = document.createElement('pre')
  log.className = 'text-xs bg-base-200 p-3 rounded min-h-24 whitespace-pre-wrap'

  const el = document.createElement('ui-input') as Input
  el.setAttribute('name', 'name')
  el.setAttribute('type-name', 'name')
  el.setAttribute('placeholder', 'Escribe un nombre…')
  el.connect((event) => {
    log.textContent = JSON.stringify(
      {
        emitUp: {
          verb: event.verb,
          type: event.type,
          value: event.value,
        },
        resources: { ...el.resources.values },
      },
      null,
      2,
    )
  })

  const home = document.createElement('a')
  home.href = '/'
  home.className = 'link text-sm'
  home.textContent = '← home (address)'

  wrap.append(title, hint, el, log, home)
  return wrap
}
