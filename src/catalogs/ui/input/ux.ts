import template from './ux.html?raw'
import { subjects, type PrimitiveEvent } from '~/catalogs/primitives/events'
import { HtmlView } from './html'

export type UxProps = {
  type: string
  name: string
  value: string
  placeholder: string
  predicate: string
}

export type UxEvents = {
  input: PrimitiveEvent
  blur: PrimitiveEvent
}

/** Artefacto UX: HTML + sensores. */
export class InputUx extends HtmlView<UxProps, UxEvents> {
  protected readonly template = template

  protected defaults(): Partial<UxProps> {
    return {
      type: 'text',
      name: '',
      value: '',
      placeholder: '',
      predicate: 'string',
    }
  }

  protected bind(root: HTMLElement): () => void {
    const el = root.querySelector('[data-sensor]') as HTMLInputElement | null
    if (!el) return () => {}

    const fire = (verb: 'input' | 'blur') => {
      this.emit(verb, {
        subject: subjects.user,
        verb,
        type: this.props.predicate,
        value: el.value,
      })
    }

    const onInput = () => fire('input')
    const onBlur = () => fire('blur')
    el.addEventListener('input', onInput)
    el.addEventListener('blur', onBlur)

    return () => {
      el.removeEventListener('input', onInput)
      el.removeEventListener('blur', onBlur)
    }
  }

  protected paint(root: HTMLElement): void {
    const el = root.querySelector('[data-sensor]') as HTMLInputElement | null
    if (!el) return
    el.type = this.props.type || 'text'
    el.name = this.props.name
    el.placeholder = this.props.placeholder
    if (document.activeElement !== el) el.value = this.props.value
  }
}
