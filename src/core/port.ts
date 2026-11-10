/**
 * Cable al presentar un hijo: qué predicado/type usa.
 * Ej: { input: 'name' } → values['name'] en Resources del padre.
 */
export type Port = {
  input?: string
  [key: string]: string | undefined
}
