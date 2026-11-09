export interface FieldProps {
  label?: string
  name?: string
  error?: string
  required?: boolean
}

export const Reads: string | null = null

export const Triggers: string[] = []

export const Says: { verb: string, type: string | null }[] = []

export const Brief = 'UX chassis for one field: label and validation chrome around a control.'
