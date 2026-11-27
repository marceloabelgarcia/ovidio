import { Port, TypePart, TriggerRelation } from 'core/types'
import { Widget } from 'core/widget'
import { actions } from 'catalog/html/core/types'
import { InputContainer } from './container'

export class Input extends Widget {
  constructor(port: Port = {}) {
    const { name } = (port.input as TypePart) ?? {}
    // un solo port para el jefe y su lugar: el lugar escucha 'change' y lo cuenta 'changed'; el jefe lo avisa igual
    const relations: TriggerRelation[] = [
      {
        trigger: { action: actions.change, state: 'finished' },
        triggers: [
          { action: actions.change, state: 'finished' },
          // { action: actions.input, state: 'finished' },
        ],
      },
      ...(port.relations ?? []),
    ]
    const own = { ...port, relations }
    const mother = new InputContainer(own)

    super(mother, [], own)

    if (name) {
      this.set(name, (mother.element as HTMLInputElement).value)
    }
  }
}

export { InputContainer } from './container'
