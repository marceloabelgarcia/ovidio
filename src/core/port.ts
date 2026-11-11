/**
 * Cable al presentar un hijo / nivel.
 * — input: predicado o verbo que emite (Button)
 * — trigger: verbo que espera de Father
 * — output: cierres hacia el padre — { name: verboNuevo, type: desglose|tipo }
 */

export type TypePart = {
  name: string
  type: string | TypePart[]
}

export type Port = {
  input?: string
  output?: TypePart[] | string
  trigger?: string
  [key: string]: string | TypePart[] | string[] | undefined
}

/** Normaliza port.output a lista de cierres. */
export function outputParts(output?: TypePart[] | string): TypePart[] {
  if (output == null) return []
  if (typeof output === 'string') return [{ name: output, type: output }]
  return output
}

/**
 * ¿Este evento dispara el cierre?
 * — type string: coincide con event.type
 * — type TypePart[]: algún part.name === event.verb
 */
export function matchesClosure(part: TypePart, event: { verb: string; type?: string }): boolean {
  const t = part.type
  if (typeof t === 'string') {
    return event.type === t || event.verb === part.name
  }
  return t.some((p) => p.name === event.verb)
}
