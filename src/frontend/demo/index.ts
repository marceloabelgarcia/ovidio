import { Widget } from '~/core'
import { Container } from './container'
import { Button } from './button'
import { Input } from './input'
import { Output } from './output'

/**
 * Demo: al presentar el hijo se declara el port (dato string 'name').
 * ≈ port.input = 'name' del widget dinámico.
 */
export class Demo extends Widget {
  constructor() {
    super(Container, [
      [Input, { input: 'name' }],
      [Output, { input: 'name' }],
      Button,
    ])
  }
}
