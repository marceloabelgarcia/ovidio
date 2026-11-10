/** Host lógico (sin DOM): recipiente que Mother presta a los hijos. */
export type LogicHost = {
  kind: 'logic'
  nodes: string[]
}

/** Shell de servidor que alberga. */
export class Container {
  readonly interior: LogicHost = { kind: 'logic', nodes: [] }

  close() {
    console.log('[server] container close →', this.interior)
  }
}
