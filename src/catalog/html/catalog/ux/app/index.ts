import { Mother } from 'core/mother'
import { HtmlNode } from '../../../core/html-container'

export class App extends Mother {
    constructor(el: HTMLElement) {
      super(new HtmlNode(el))
    }
  }
  