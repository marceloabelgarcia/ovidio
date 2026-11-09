export type FetchProps = {
  /** Recurso a enviar (state del nivel / port.input). */
  value?: unknown
  name?: string
  /**
   * Orden del Father cuando un hermano disparó `submitted`.
   * Aún no cableado en Father; el contrato ya está.
   */
  order?: { n: number, from?: string }
}

export type FetchDispatch = {
  verb: string
  type: null
  value: unknown
}

export type FetchEmits = {
  dispatch: [message: FetchDispatch]
}
