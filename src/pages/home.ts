import type { NodeWidget } from '~/catalogs/widgets'
import type { Widget } from '~/widget/Widget'

/** Igual que pages/widget/[_index].vue — `address` fijo (sin router). */
const input = 'address'

const widget: NodeWidget = {
  name: 'demo-address',
  port: { input, output: 'save' },
  children: [
    {
      name: 'editor',
      template: 'Edit',
      port: { input, output: 'save' },
    },
  ],
}

export function HomePage(): HTMLElement {
  const wrap = document.createElement('div')
  wrap.className = 'pl-12 max-w-lg'

  const node = document.createElement('widget-node') as Widget
  node.widget = widget
  wrap.append(node)

  return wrap
}
