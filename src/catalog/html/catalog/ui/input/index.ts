import { HtmlContainer } from 'catalog/html/core/html-container'
import { Action, Output, Port, Resource, Verb } from 'core/types'

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
      action: change.name,
      actor: change.noun,
      inProgress: change.gerund,
      completed: change.participle,
    },
  ) {
    const input = document.createElement('input')
    input.className = 'input'

    super(input, [], port)

    input.addEventListener('change', ($event: Event) => {
      const resource: Resource = {
        type: 'string',
        value: ($event.target as HTMLInputElement).value,
      }

      const output: Output = {
        event: { action, state: 'completed', time: new Date() },
        resource,
      }
      this.dispatch(output)
    })
  }
}
