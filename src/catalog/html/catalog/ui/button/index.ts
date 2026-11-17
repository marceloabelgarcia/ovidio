import { HtmlContainer } from 'catalog/html/core/html-container'
import { Action, Output, Resource, Verb } from 'core/types'

const submit: Verb = {
  name: 'submit',
  noun: 'user',
  gerund: 'submitting',
  participle: 'submitted',
}

/** Hoja Container: usable como hijo en cualquier lado. */
export class ButtonContainer extends HtmlContainer {
  constructor(
    action: Action = {
      action: submit.name,
      actor: submit.noun,
      inProgress: submit.gerund,
      completed: submit.participle,
    },
  ) {
    const button = document.createElement('button')
    button.className = 'btn btn-primary'
    button.textContent = action.action

    super(button, [])

    button.addEventListener('click', ($event: Event) => {
      const resource: Resource = {
        type: 'Event',
        value: $event,
      }

      const output: Output = {
        event: { action, state: 'completed', time: new Date() },
        resource,
      }
      this.dispatch(output)
    })
  }
}
