export interface AppProps {
  /** Identidad del nivel (p.ej. Edit). */
  name?: string
  label?: string
  /** Aspecto continuo del relato (Mother → layout). */
  loading?: boolean
  disabled?: boolean
}

export const Brief =
  'UX chassis de nivel raíz de un árbol widget: agrupa Fields/Actions. No es el app/router de Nuxt.'
