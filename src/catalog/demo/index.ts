import { Widget } from '~/core'
import type { TypePart } from '~/core/port'
import { Container } from '~/catalog/ui/container'
import { Button } from '~/catalog/ui/button'
import { Input } from '~/catalog/ui/input'
import { Output } from '~/catalog/ui/output'
import { Get } from '~/catalog/work/get'

export const string = 'string'

const loaded: TypePart[] = [{ name: 'sended', type: string }]
const success: TypePart[] = [{ name: 'loaded', type: string }]

/**
 * Combinado de catálogo: une ui + work.
 * (Runtime / new → app/pages)
 */
export class Demo extends Widget {
  constructor() {
    super(
      Container,
      [
        [Input, { input: 'name', trigger: 'changed' }],
        [Output, { input: 'name', trigger: 'changed' }],
        [Button, { input: 'submitted' }],
        [
          Get,
          {
            input: 'name',
            trigger: 'submitted',
            output: [
              { name: 'loaded', type: loaded },
              { name: 'changed', type: loaded },
            ],
          },
        ],
      ],
      { input: 'Demo', output: [{ name: 'success', type: success }] },
    )
  }
}
