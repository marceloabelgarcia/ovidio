import {
  Action,
  Output,
  Port,
  Resource,
  State,
  TriggerRelation,
  TypePart,
} from './types'

/** Clave de resource desde port.input (nunca un array como clave). */
export function resourceTypeFromPort(port: Port): string {
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

/**
 * Reacción del nivel: resources, hermanos, avisar al padre.
 */
export class Father {
  public parent: Father | null = null
  public readonly children: Father[] = []
  public port: Port = {}
  readonly resources: Record<string, unknown> = {}

  constructor(port: Port = {}) {
    this.port = port

    console.log(this.children)
  }

  dispatched(output: Output): void {

    console.log('output=', output)
    const { value, type } = output.resource
    if (typeof type === 'string') {
      this.resources[type] = value
    }

    const state = output.event.trigger.state as State

    const brothers = this.children.filter((child) => {
      return (
        child.port.trigger?.action[state] ===
        output.event.trigger.action[state] && child !== output.event.target
      )
    })


    brothers.forEach((brother) => {
      const key = resourceTypeFromPort(brother.port)
      const resourceValue = this.resources[key]
      brother.execute({ type: key, value: resourceValue })
    })

    this.port.output?.forEach((relation: TriggerRelation) => {
      const { trigger, triggers } = relation

      triggers.forEach((action: Action) => {
        if (action[state] === output.event.trigger.action[state]) {
          this.parent?.dispatched({
            event: {
              trigger,
              time: new Date(),
              target: this,
            },
            resource: {
              type: resourceTypeFromPort(this.port),
              value: this.resources,
            },
          })
        }
      })
    })
  }

  execute(_resource?: Resource): void {}
}
