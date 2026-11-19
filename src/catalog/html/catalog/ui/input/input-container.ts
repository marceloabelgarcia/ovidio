import { HtmlContainer } from 'catalog/html/core/html-container'
import { Action, Output, Port, Resource, TypePart, Verb } from 'core/types'

const change: Verb = {
  name: 'change',
  noun: 'user',
  gerund: 'changing',
  participle: 'changed',
}

/** Shell DOM de un input hoja. */
export class InputContainer extends HtmlContainer {
  constructor(
    port: Port = {},
    action: Action = {
      verb: change.name,
      actor: change.noun,
      progress: change.gerund,
      finished: change.participle,
    },
  ) {
    const input = document.createElement('input')
    input.className = 'input'
    input.placeholder = port.input as string

    super(input, [], port)

    input.addEventListener('change', ($event: Event) => {
      const resource: Resource = {
        type: port.input as TypePart['name'],
        value: ($event.target as HTMLInputElement).value,
      }

      const output: Output = {
        event: { trigger: { action, state: 'finished' }, time: new Date(), target: this },
        resource,
      }
      this.dispatch(output)
    })
  }

  override execute(resource?: Resource): void {
    const key =
      typeof this.port.input === 'string' ? this.port.input : undefined
    let value = resource?.value

    // Compuesto { name, door } → valor de este slot
    if (
      key &&
      value &&
      typeof value === 'object' &&
      !Array.isArray(value)
    ) {
      value = (value as Record<string, unknown>)[key]
    }

    // Sin valor para este campo: no pisar el input
    if (value == null) return

    ;(this.element as HTMLInputElement).value = String(value)
  }
}
