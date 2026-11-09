import { shellOf } from '~/catalogs/ux'

/**
 * Equivalente a Mother.vue — misma responsabilidad.
 * Cáscara UX (`container` del catálogo) alrededor de los hijos.
 */
export type MotherProps = {
  container?: string
  params?: Record<string, unknown>
}

export function Mother(
  host: HTMLElement,
  props: MotherProps,
  children: Node[],
): void {
  const wrap = document.createElement('div')
  wrap.className = 'space-y-2'

  const tag =
    typeof props.container === 'string' ? shellOf(props.container) : undefined

  if (tag) {
    const shell = document.createElement(tag)
    if (props.params) {
      for (const [key, value] of Object.entries(props.params)) {
        if (value === undefined || value === null || value === '') continue
        shell.setAttribute(key, String(value))
      }
    }
    shell.append(...children)
    wrap.append(shell)
  } else {
    wrap.append(...children)
  }

  host.replaceChildren(wrap)
}
