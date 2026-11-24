import { Mother } from 'core/mother'
import { HtmlNode, HtmlContent } from '../../../core/html-container'
import { Port } from 'core/types'

export class OutputContainer extends Mother {
  constructor(port: Port = {}) {
    const input = port.input
    let output: HtmlContent

    if (typeof input === 'string') {
      output = document.createTextNode(input)
    } else if (input instanceof HTMLElement) {
      output = input
    } else {
      output = document.createElement('div')
    }

    super(new HtmlNode(output))
  }

  show(host: HTMLElement, content?: unknown): void {
    const text = content == null ? '' : String(content)
    if (host instanceof Text) {
      host.data = text
    } else {
      host.textContent = text
    }
  }

  execute(content?: unknown): void {
    const host = (this.host as HtmlNode | null)?.element
    if (!host) return

    const action = "show"
    this[action](host as HTMLElement, content)
  }
}
