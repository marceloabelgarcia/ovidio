import { App } from '../catalog/ux/app/'
import { Widget } from 'core/widget'
import { StreetView } from './street-view'

/**
 * AppDemo: App + vistas.
 *
 *   App
 *     └── AppContainer
 *           └── StreetView.mother (ViewContainer)
 *                 ├── Input
 *                 ├── Display
 *                 └── Button
 */
export class AppDemo extends Widget {
  constructor(el: HTMLElement) {
    super(new App(el), [{ child: StreetView }])
  }
}

export { AppDemo as Demo }
