import { HtmlContainer } from 'catalog/html/core/html-container'
import { Output, Port } from 'core/types'

/** <dialog> de daisyUI: se abre cuando su widget recibe una orden. */
export class ModalContainer extends HtmlContainer {
  private readonly message: HTMLElement

  constructor(port: Port = {}) {
    const dialog = document.createElement('dialog')
    dialog.className = 'modal'

    const box = document.createElement('div')
    box.className = 'modal-box'

    const title = document.createElement('h3')
    title.className = 'text-lg font-bold'
    title.textContent = typeof port.input === 'string' ? port.input : 'Aviso' // el input del modal es su título

    const message = document.createElement('p')
    message.className = 'py-4'

    const action = document.createElement('form')
    action.method = 'dialog'
    action.className = 'modal-action'
    const close = document.createElement('button')
    close.className = 'btn'
    close.textContent = 'Cerrar'
    action.appendChild(close)

    const backdrop = document.createElement('form')
    backdrop.method = 'dialog'
    backdrop.className = 'modal-backdrop'
    backdrop.appendChild(document.createElement('button'))

    box.append(title, message, action)
    dialog.append(box, backdrop)

    super(dialog, port)
    this.message = message
  }

  execute(output: Output): void {
    const value = output.resource?.value
    this.message.textContent = value == null ? '' : String(value)
    const dialog = this.element as HTMLDialogElement
    if (!dialog.open) dialog.showModal()
  }
}
