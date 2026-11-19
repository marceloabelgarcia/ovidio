import { HtmlContainer } from '../../../core/html-container'

/** Shell HTML de una Page (section por defecto). */
export class PageContainer extends HtmlContainer {
  constructor(el: HTMLElement = document.createElement('section')) {
    el.classList.add('page')
    super(el)
  }
}
