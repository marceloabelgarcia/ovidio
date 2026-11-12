import { Container } from './container'
import { OnAction, Output, Trigger, Port, TypePart } from './types'
import { HtmlContainer } from './html-container'

/** Clase de container: importada, la instancia Widget. */
export type ContainerClass = new (
  parent: Container,
  triggers?: Trigger[],
  onAction?: OnAction,
  value?: HtmlContainer | string | undefined,
  type?: string
) => Container

// Widget: Container + children + port + triggers
export class Widget {
  public readonly container: Container
  private values: Record<string, unknown> = {}
  protected parentWidget: Widget | null = null

  constructor(
    parent: Container,
    ContainerClass: ContainerClass,
    public readonly children: Widget[] = [],
    public readonly port: Port = {},
    triggers: Trigger[] = [],
  ) {
    const type = this.port.input as string
    const value = this.values[type] as HtmlContainer | string | undefined

    this.container = new ContainerClass(parent, triggers, (output: Output) => this.onAction(output), value, type)

    this.children.forEach((child) => {
      child.parentWidget = this
    })
  }

  /** Puente interno: sensor → flujo del widget. */
  protected onAction(output: Output): void {
    console.log('widget action', output)

    this.values[output.type] = output.value

    // Si el completed del sensor está declarado en port.output, avisa al padre widget.
    const outs = this.port.output
    if (Array.isArray(outs)) {
      const match = outs.find(
        (part): part is TypePart =>
          typeof part !== 'string' && part.name === output.trigger.completed,
      )

      if (match) {
        this.parentWidget?.onChildAction({
          ...output,
          trigger: { ...output.trigger, completed: match.name },
        }, this)
      }
    }
  }

  protected onChildAction(output: Output, childWidget: Widget): void {

    this.children.map((child) => {

      const childTrigger = child.port.trigger

      if (child === childWidget) {
        return
      }

      if (childTrigger?.completed === output.trigger.completed) {
        child.setValue(output.value as string)
      }
    })


  }

  setValue(value: string): void {
    this.container.setValue(value)
  }
}
