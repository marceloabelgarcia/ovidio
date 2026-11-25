import { ButtonContainer } from '../../ux/button'
import { Port } from 'core/types'
import { Widget } from 'core/widget'
import { OutputContainer } from '../../ux/output'


export class DisplayButton extends Widget {
  constructor(port: Port = {}) {
    super(new OutputContainer(port), [], port)
  }
}


export class DisplayContent extends Widget {
  constructor(port: Port = {}) {
    super(new OutputContainer(port), [], port)
  }
}

export class Button extends Widget {
  constructor(port: Port = {}) {
    // uno por botón: un nodo del DOM vive en un solo lugar (appendChild lo mueve)
    const content: HTMLElement = document.createElement('div')
    content.className = 'border-2 border-red-500 font-bold text-2xl'
    content.textContent = 'HOLA'

    super(
      new ButtonContainer(port),
      [
        { child: DisplayButton, port: { input: "HOLA" } },
        { child: DisplayButton, port: { input: content } },
      ],
      port,
    )
  }
}
