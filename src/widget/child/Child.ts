import type { NodeWidget } from '~/catalogs/widgets'
import { resolveWidget } from '~/widget/resolve'
import { mountPrimitive } from './Primitive'
import type { Father } from '~/widget/Father'
import type { Resources } from '~/widget/Resources'
import type { Widget } from '~/widget/Widget'

export type ChildProps = {
  widget: NodeWidget
  value?: unknown
  port?: { input: string; output: string; trigger: string }
  father: Father
  scope: Resources
}

/**
 * Equivalente a Child.vue — misma responsabilidad.
 */
export function mountChild(host: HTMLElement, props: ChildProps): void {
  const resolved = resolveWidget(props.widget)

  if (resolved.level) {
    const node = document.createElement('widget-node') as Widget
    node.widget = resolved.level
    node.value = props.value
    node.port = props.widget.port as ChildProps['port']
    node.parentFather = props.father
    node.scope = props.scope
    host.replaceChildren(node)
    return
  }

  if (resolved.primitive) {
    mountPrimitive(host, {
      primitive: resolved.primitive,
      name: resolved.name,
      value: props.value,
      father: props.father,
      scope: props.scope,
    })
  }
}
