import { HtmlNode } from '../../../core/html-container'
import { Port, TypePart } from 'core/types'

/** <fieldset> con su <legend> = el name del TypePart. */
export class FieldsetContainer extends HtmlNode {
  constructor(port: Port = {}) {
    const el = document.createElement('fieldset')
    el.className = 'fieldset border border-base-300 rounded-box p-3'

    const part = port.input as TypePart | undefined
    if (part?.name) {
      const legend = document.createElement('legend')
      legend.className = 'fieldset-legend'
      legend.textContent = part.name
      el.appendChild(legend)
    }

    super(el, port)
  }
}
