import { HtmlContainer } from '../../../core/html-container'

/** Shell HTML de una View (div por defecto). */
export class ViewContainer extends HtmlContainer {
  constructor(el: HTMLElement = document.createElement('div')) {
    super(el)
  }
}
