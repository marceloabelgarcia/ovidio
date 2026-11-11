export type OnAction = (verb: string) => void

export type Trigger = {
  name: string
  executed: string
}

export class Container {
  constructor(
    readonly parent: Container | null,
    readonly element: HTMLElement | Container,
    triggers: Trigger[] = [],
    private readonly onAction: OnAction = () => {},
  ) {
    if ('addEventListener' in element) {
      triggers.forEach((trigger) => {
        element.addEventListener(trigger.name, () => {
          this.handleAction(trigger.executed)
        })
      })
    }

    if (parent) {
      const parentElement = parent.element

      if (parentElement instanceof HTMLElement) {
        if (element instanceof Container) {
          parentElement.appendChild(element.element as Node)
        } else {
          parentElement.appendChild(element)
        }
      }
    }
  }

  /** Sensor propio: avisa a su Widget y sube por containers. */
  handleAction(verb: string): void {
    this.onAction(verb)
    this.parent?.onChildAction(verb)
  }

  /**
   * Llega desde un container hijo.
   * Solo cadena de containers (no dispara el Widget de cada ancestro).
   */
  onChildAction(verb: string): void {
    this.parent?.onChildAction(verb)
  }
}
