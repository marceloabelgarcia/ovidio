import { Container, OnAction, Trigger } from './container'

export type TypePart = {
  name: string
  excecuted: string
  type: string | TypePart[]
}

export type Port = {
  input?: TypePart[] | string
  output?: TypePart[] | string
  trigger?: string
  [key: string]: string | TypePart[] | string[] | undefined
}

/** Clase de container: importada, la instancia Widget. */
export type ContainerClass = new (
  parent: Container,
  triggers?: Trigger[],
  onAction?: OnAction,
) => Container

export class Widget {
  public readonly container: Container

  constructor(
    parent: Container,
    ContainerClass: ContainerClass,
    public readonly children: Widget[],
    public readonly port: Port,
    triggers: Trigger[] = [],
  ) {
    this.container = new ContainerClass(parent, triggers, (verb) => this.onAction(verb))
  }

  /** Puente interno: sensor HTML → flujo del widget. */
  protected onAction(verb: string): void {
    console.log('widget action', verb)
  }
}
