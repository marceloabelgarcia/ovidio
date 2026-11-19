import { Action, Port, State, Trigger, TriggerRelation, TypePart } from 'core/types'
import { ChildSpec } from 'core/widget'
import { SingleInput } from './single-input'

function partsFromInput(input: Port['input']): TypePart[] | null {
  if (Array.isArray(input)) return input

  if (
    input &&
    typeof input === 'object' &&
    'type' in input &&
    Array.isArray(input.type)
  ) {
    return input.type
  }

  return null
}

/** Si hay trigger y no output, el nivel Input sube ese evento al padre. */
export function levelPortFromInput(port: Port): Port {
  if (port.output || !port.trigger) return port

  const trigger = port.trigger as Trigger
  const action = trigger.action as Action
  const state = trigger.state as State

  const output: TriggerRelation[] = [
    {
      trigger: { action, state },
      triggers: [action],
    },
  ]

  return { ...port, output }
}

/** Traduce port.input → hijos SingleInput (conserva el resto del port). */
export function childrenFromInputPort(port: Port): ChildSpec[] {
  const input = port.input
  const parts = partsFromInput(input)

  if (parts) {
    return parts.map((part: TypePart) => ({
      child: SingleInput,
      port: { ...port, input: part.name },
    }))
  }

  if (typeof input === 'string') {
    return [{ child: SingleInput, port: { ...port, input } }]
  }

  if (
    input &&
    typeof input === 'object' &&
    !Array.isArray(input) &&
    typeof input.type === 'string'
  ) {
    return [{ child: SingleInput, port: { ...port, input: input.name } }]
  }

  return [{ child: SingleInput, port }]
}
