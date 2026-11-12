import { Container } from '../container'
import { OnAction } from '../types'
import { HtmlContainer } from '../html-container'
import { Trigger } from '../types'

export class DisplayContainer extends HtmlContainer {
  constructor(
    parent: Container,
    triggers: Trigger[] = [],
    onAction: OnAction = () => { },
    value?: HtmlContainer | string | undefined,
    type?: string,
  ) {
    const display = document.createElement('div')

    display.className = 'border border-gray-300 rounded-md p-2 h-20'

    console.log('VALUE: ', value);
    value = value ?? 'HOLA MUNDO'
    if (typeof value === 'string') {
      display.textContent = value
    } else {
      display.appendChild(value?.element as HTMLElement)
    }

    super(parent, display, triggers, onAction, value, type)
  }

  /** Actualiza el DOM cuando recibe un nuevo valor desde arriba */
  override setValue(value: HtmlContainer | string): void {
    this.element.innerHTML = '' // Limpia el contenido anterior

    if (typeof value === 'string') {
      this.element.textContent = value
    } else if (value instanceof HtmlContainer) {
      this.element.appendChild(value.element)
    }
  }
}
