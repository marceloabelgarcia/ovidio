import { OnAction, Output } from './types'

/** Base: cadena + onAction (output del sensor → Widget). Sin HTML. */
export class Container {


  constructor(
    readonly parent: Container | null,
    private readonly onAction: OnAction = () => {},
    value: unknown,
    type: string = 'string',
  ) {}

  /** Sensor propio: avisa a su Widget y sube por containers. */
  handleAction(output: Output): void {
    this.onAction(output)
    this.parent?.onChildAction(output)
  }

  /**
   * Llega desde un container hijo.
   * Solo cadena de containers (no dispara el Widget de cada ancestro).
   */
  onChildAction(output: Output): void {
    this.parent?.onChildAction(output)
  }


}
