import { Output, Port, Resource, Event, Action, TypePart } from './types'

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
    console.log('LLEGO!! ', output.event.action.completed, this)
    // guardar recurso
    const { value, type } = output.resource
    this.resources[type] = value

    // ejecutar triggers
    const { action, state } = output.event
    const trigger = action[state]
    const brothers = this.children.filter(child => child !== this && child.port.trigger === trigger)
    brothers?.forEach(brother => brother.execute(output.resource))

    // avisar al padre
    const outputs = this.port.output

    outputs?.forEach((relation) => {
      const { name, type } = relation
      
      Array.isArray(type) && type.forEach((typePart: TypePart) => {

        if (typePart.name === trigger) {
          const event: Event = {
            action: {
              action: name,
              actor: 'system',
              inProgress: name,
              completed: name,
            } as Action,
            state: 'completed',
            time: new Date(),
          }
          const resource = {
            type: typePart.type,
            value: value,
          } as Resource
 
          this.parent?.dispatched(
            {
              event: event,
              resource: resource,
            } as Output
          )
        }
      })
    })

  }

  execute(_resource?: Resource): void { }
}
