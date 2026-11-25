import { Port } from 'core/types'
import { Mother } from 'core/mother'
import { Widget } from 'core/widget'
import { HtmlNode } from '../core/html-container'
import { Button } from '../catalog/ui/button'
import { Input } from '../catalog/ui/input'
import { actions } from '../core/types'
import { name, door } from './type'
import { App } from '../catalog/ux/app'

/** Host columna: hijos uno debajo de otro. */
export class Col extends Mother {
  constructor(port: Port = {}) {
    const el = document.createElement('div')
    el.className = 'flex flex-col gap-2 p-2 min-h-screen border border-black'
    super(new HtmlNode(el), [], port)
  }
}

/** Host fila: hijos en horizontal. */
export class Row extends Mother {
  constructor(port: Port = {}) {
    const el = document.createElement('div')
    el.className = 'flex flex-row gap-2 p-2 flex-1 border border-blue-500'
    super(new HtmlNode(el), [], port)
  }
}

/** Panel genérico con host abierto + etiqueta. */
class Panel extends Mother {
  constructor(label: string, className: string, port: Port = {}) {
    const el = document.createElement('div')
    el.className = className
    el.textContent = label
    super(new HtmlNode(el), [], port)
  }
}

export class Header extends Widget {
  constructor(port: Port = {}) {
    super(new Panel('header', 'p-3 border border-neutral-400 bg-neutral-100', port), [], port)
  }
}

export class Footer extends Widget {
  constructor(port: Port = {}) {
    super(new Panel('footer', 'p-3 border border-neutral-400 bg-neutral-100', port), [], port)
  }
}

export class LeftPanel extends Widget {
  constructor(port: Port = {}) {
    super(new Panel('left', 'w-40 p-3 border border-emerald-500 bg-emerald-50', port), [], port)
  }
}

export class RightPanel extends Widget {
  constructor(port: Port = {}) {
    super(new Panel('right', 'w-40 p-3 border border-emerald-500 bg-emerald-50', port), [], port)
  }
}

/** Host del contenido central (abierto). */
class ContentHost extends Mother {
  constructor(port: Port = {}) {
    const el = document.createElement('div')
    el.className = 'flex flex-col gap-2 p-2 flex-1 border border-red-500'
    super(new HtmlNode(el), [], port)
  }
}

/** Contenido del demo: button + inputs. */
export class DemoWidget extends Widget {
  constructor(port: Port = {}) {
    super(new ContentHost(), [
      {
        child: Button,
        port: {
          ...port,
          relations: [
            {
              trigger: { action: actions.submit, state: 'finished' },
              triggers: [actions.click],
            },
          ],
        },
      },
      { child: Input, port: { input: name } },
      { child: Input, port: { input: door } },
      {
        child: Input,
        port: {
          input: name,
          trigger: { action: actions.change, state: 'finished' },
        },
      },
    ], {
      relations: [
        {
          trigger: { action: actions.save, state: 'finished' },
          triggers: [actions.submit],
        },
      ],
    })
  }
}

/** main: left | DemoWidget | right */
export class Main extends Widget {
  constructor(port: Port = {}) {
    super(new Row(), [
      { child: LeftPanel, port: {} },
      { child: DemoWidget, port: {} },
      { child: RightPanel, port: {} },
    ], port)
  }
}

/** page: header / main / footer */
export class Page extends Widget {
  constructor(port: Port = {}) {
    super(new Col(), [
      { child: Header, port: {} },
      { child: Main, port: {} },
      { child: Footer, port: {} },
    ], port)
  }
}

/** Raíz: App(#app) → Page. */
export class AppDemo extends Widget {
  constructor(el: HTMLElement) {
    super(new App(el), [
      { child: Page, port: {} },
    ])
  }
}

export { AppDemo as Demo }
