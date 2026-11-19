import type { Father } from './father'
import {
  Action,
  Output,
  Port,
  State,
  TriggerRelation,
  TypePart,
} from './types'

function resourceTypeFromPort(port: Port): string {
  const input = port.input

  if (typeof input === 'string') return input

  if (input && typeof input === 'object' && !Array.isArray(input) && 'name' in input) {
    return (input as TypePart).name
  }

  if (Array.isArray(input)) {
    return input.map((part) => part.name).join('.')
  }

  return 'value'
}

function executeBrothers(father: Father, output: Output, state: State): void {
  const brothers = father.children.filter((child) => {
    return (
      child.port.trigger?.action[state] ===
      output.event.trigger.action[state] && child !== output.event.target
    )
  })

  brothers.forEach((brother) => {
    const key = resourceTypeFromPort(brother.port)
    const resourceValue = father.resources[key]
    brother.execute({ type: key, value: resourceValue })
  })
}

function notifyParent(father: Father, output: Output, state: State): void {
  father.port.output?.forEach((relation: TriggerRelation) => {
    const { trigger, triggers } = relation

    triggers.forEach((action: Action) => {
      if (action[state] === output.event.trigger.action[state]) {
        father.parent?.dispatched({
          event: {
            trigger,
            time: new Date(),
            target: father,
          },
          resource: {
            type: resourceTypeFromPort(father.port),
            value: father.resources,
          },
        })
      }
    })
  })
}

/**
 * Reacción del nivel: resources, hermanos, avisar al padre.
 */
export function dispatchOutput(father: Father, output: Output): void {
  console.log('output=', output)
  const { value, type } = output.resource
  if (typeof type === 'string') {
    father.resources[type] = value
  }

  const state = output.event.trigger.state as State

  executeBrothers(father, output, state)
  notifyParent(father, output, state)
}
