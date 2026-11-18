import { HtmlContainer } from 'catalog/html/core/html-container'
import { Action, Output, Port, Resource, TypePart, Verb } from 'core/types'

const change: Verb = {
  name: 'change',
  noun: 'user',
  gerund: 'changing',
  participle: 'changed',
}

/** Hoja Container: usable como hijo en cualquier lado. */
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

    super(input, [], port)

    input.addEventListener('change', ($event: Event) => {
      const resource: Resource = {
        type: port.input as TypePart["name"],
        value: ($event.target as HTMLInputElement).value,
      }

      const output: Output = {
        event: { trigger: { action, state : 'finished'}, time: new Date() },
        resource,
      }
      this.dispatch(output)
    })
  }
}
