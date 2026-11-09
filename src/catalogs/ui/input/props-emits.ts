/**
 * Unidad lógica: props + emits.
 * Sin HTML, sin contenedores, sin Mother.
 */
export type EmitHandler<Events extends Record<string, unknown>> = <
  K extends keyof Events & string,
>(
  name: K,
  payload: Events[K],
) => void

export abstract class Unit<
  Props extends Record<string, unknown> = Record<string, unknown>,
  Events extends Record<string, unknown> = Record<string, unknown>,
> {
  props: Props
  #emitHandler?: EmitHandler<Events>

  constructor(props: Partial<Props> = {}) {
    this.props = { ...this.defaults(), ...props } as Props
  }

  protected defaults(): Partial<Props> {
    return {}
  }

  onEmit(handler: EmitHandler<Events>): void {
    this.#emitHandler = handler
  }

  setProps(patch: Partial<Props>): void {
    Object.assign(this.props, patch)
    this.propsChanged(patch)
  }

  protected emit<K extends keyof Events & string>(
    name: K,
    payload: Events[K],
  ): void {
    this.#emitHandler?.(name, payload)
  }

  protected propsChanged(_patch: Partial<Props>): void {}
}
