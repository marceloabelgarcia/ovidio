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
 * Reacción del nivel: resources, hermanos, avisar al padre.
 * Pensado para herencia: ContainerFather extends Father → usa this.
 */
export class Father {
  public parent: Father | null = null
  public readonly children: Father[] = []
  public port: Port = {}
  readonly resources: Record<string, unknown> = {}

  constructor(port: Port = {}) {
    this.port = port
  }

  dispatched(output: Output): void {
    console.log('output', output)

    const { value, type } = output.resource
    this.resources[type] = value
    
    const brothers = this.children.filter(
      (child) => {
        const state = output.event.trigger.state as State
        return child.port.trigger?.action[state] === output.event.trigger.action[state]
      }
    )

    brothers.forEach((brother) => {
      brother.execute(output.resource)
    })
    
    this.port.output?.forEach((relation: TriggerRelation) => {
      const { trigger, triggers } = relation

      triggers.forEach((action: Action) => {
        const state: State = output.event.trigger.state as State
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

  /** Las hojas lo overridean; Father solo lo invoca en hermanos. */
  execute(_resource?: Resource): void {}
}
