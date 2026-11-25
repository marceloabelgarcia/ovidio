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

const content: HTMLElement = document.createElement('div')
content.className = 'border-2 border-red-500 font-bold text-2xl'
content.textContent = 'HOLA'


export class Button extends Widget {
  constructor(port: Port = {}) {

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
