import { Container } from './container'
import {
  Action,
  Output,
  Port,
  Resource,
  State,
  TriggerRelation,
  TypePart,
} from './types'

/**
 * Árbol lógico: port, resources, dispatched.
 * Los hermanos salen del container del nivel (sin adopt / Peer).
 */
export class Father {
  public parent: Father | null = null
  public port: Port = {}
  readonly resources: Record<string, unknown> = {}

  constructor(
    port: Port = {},
    /** Container del Widget: de ahí se leen los hijos para execute. */
    private readonly container: Container,
  ) {
    this.port = port
  }

  dispatched(output: Output): void {
    console.log('output', output)
    const { value, type } = output.resource
    this.resources[type] = value

    const state = output.event.trigger.state as State

    for (const child of this.container.children) {
      const port = (child as Container & { port?: Port }).port
      const execute = (child as Container & {
        execute?(resource?: Resource): void
      }).execute

      if (
        port?.trigger?.action[state] ===
          output.event.trigger.action[state] &&
        execute
      ) {
        execute.call(child, output.resource)
      }
    }

    this.port.output?.forEach((relation: TriggerRelation) => {
      const { trigger, triggers } = relation

      triggers.forEach((action: Action) => {
        if (action[state] === output.event.trigger.action[state]) {
          this.parent?.dispatched({
            event: {
              trigger,
              time: new Date(),
            },
            resource: {
              type: this.port.input as TypePart['name'],
              value: this.resources,
            },
          })
        }
      })
    })
  }

  execute(_resource?: Resource): void {}
}
