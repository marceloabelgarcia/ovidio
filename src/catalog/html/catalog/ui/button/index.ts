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
      verb: submit.name,
      actor: submit.noun,
      progress: submit.gerund,
      finished: submit.participle,
    },
  ) {
    const button = document.createElement('button')
    button.className = 'btn btn-primary'
    button.textContent = action.verb

    super(button, [])

    button.addEventListener('click', ($event: Event) => {
      const resource: Resource = {
        type: 'Event',
        value: $event,
      }

      const output: Output = {
        event: { trigger: { action, state: 'finished' }, time: new Date() },
        resource,
      }
      this.dispatch(output)
    })
  }
}
