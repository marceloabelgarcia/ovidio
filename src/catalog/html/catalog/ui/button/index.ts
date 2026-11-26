import { ButtonContainer } from '../../ux/button'
import { Port } from 'core/types'
import { Widget } from 'core/widget'
import { Display } from '../display'

export class Button extends Widget {
  constructor(port: Port = {}) {
    // uno por botón: un nodo del DOM vive en un solo lugar (appendChild lo mueve)
    const content: HTMLElement = document.createElement('div')
    content.className = 'border-2 border-red-500 font-bold text-2xl'
    content.textContent = 'HOLA'

    super(
      new ButtonContainer(port),
      [
        { child: Display, port: { input: "HOLA" } },
        { child: Display, port: { input: content } },
      ],
      port,
    )
  }
}
