import { HtmlContainer } from 'catalog/html/core/html-container'
import { Port, TypePart } from 'core/types'

/** <fieldset> con su <legend> = el name del TypePart. */
export class FieldsetContainer extends HtmlContainer {
  constructor(port: Port = {}) {
    const el = document.createElement('fieldset')
    el.className = 'fieldset border border-base-300 border-green-500 rounded-box p-3'

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
