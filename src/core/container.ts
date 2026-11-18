import { Output, Port, Resource, Action, TriggerRelation, State, TypePart } from './types'

export class Container {
  public parent: Container | null = null
  public readonly children: Container[] = []
  protected resources: Record<string, unknown> = {}

  constructor(
    children: Container[] = [],
    /** Contrato de este contenedor (mutable: el nivel puede fijarlo en la mother). */
    public port: Port = {},
  ) {
    for (const child of children) {
      this.appendChild(child)
    }
  }

  public appendChild(child: Container): void {
    child.parent = this
    this.children.push(child)
  }


  dispatched(output: Output): void {

    console.log(output)

    // guardar recurso
    const { value, type } = output.resource
    this.resources[type] = value


    // ejecutar triggers
    const brothers = this.children.filter(
      (child) => {
        const state = output.event.trigger.state as State
        return child.port.trigger?.action[state] === output.event.trigger.action[state]
      }
    )

    brothers.forEach((brother) => {
      brother.execute(output.resource)
    })


    // avisar al padre
    this.port.output?.forEach((relation: TriggerRelation) => {
      const { trigger, triggers } = relation;


      triggers.forEach((action: Action) => {


        const state: State = output.event.trigger.state as State
        if (action[state] === output.event.trigger.action[state]) {

          console.log(this.resources)
          this.parent?.dispatched(
            {
              event: {
                trigger: trigger,
                time: new Date(),
              },
              resource: {
                type: this.port.input as TypePart["name"],
                value: this.resources,
              },
            } as Output
          )
        }
      })
    })

  }

  execute(_resource?: Resource): void { }
}
