/**
 * Eje verbo: conjugación inglesa mínima para el relato entre niveles.
 *
 * No es tipo de dato ni primitiva UI. Father anotará frames del historial
 * con estas formas; `port.trigger` suele esperar el past participle.
 *
 * Catálogo de uso mínimo (= convergencia hardcodeada). Más adelante podrá
 * salir de geometría / embeddings; la forma gramatical no cambia.
 */
export interface Verb {
  /** Bare infinitive / lemma — id de la familia (`save`, `submit`). */
  infinitive: string
  /** Present participle (-ing) — aspecto continuo: el suceso está en curso. */
  presentParticiple: string
  /** Past simple — frame puntual del relato (“sucedió”). */
  past: string
  /**
   * Past participle — aspecto perfecto / hecho (“ha quedado”).
   * Forma típica en `port.trigger` y en el reporte al superior al cerrar.
   */
  pastParticiple: string
}

export type VerbInfinitive = Verb['infinitive']
