export interface ActionsProps {
  /** Carcasa: deshabilitar el panel (p.ej. mientras saving). */
  disabled?: boolean
  /** Aspecto continuo del relato de composición (Mother → layout). */
  loading?: boolean
}

export const Brief =
  'UX chassis for an action panel: layout around commands (Save, Cancel, …).'
