import { Container } from './container'
import { OnAction, Output, Trigger, Port } from './types'

/** Clase de container: importada, la instancia Widget. */
export type ContainerClass = new (
  parent: Container,
  triggers?: Trigger[],
  onAction?: OnAction,
  value?: unknown | string,
  type?: string
) => Container

export class Widget {
  public readonly container: Container
  private values = {}

  constructor(
    parent: Container,
    ContainerClass: ContainerClass,
    public readonly children: Widget[] = [],
    public readonly port: Port = {},
    triggers: Trigger[] = [],
  ) {
    this.container = new ContainerClass(parent, triggers, (output: Output) => this.onAction(output))
  }

  /** Puente interno: sensor → flujo del widget. */
  protected onAction(output: Output): void {
    console.log('widget action', output.trigger)

    this.values[output.type] = output.value

    console.log(this.values)
  }



}
