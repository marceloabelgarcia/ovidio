import { Port } from 'core/types'
import { Widget } from 'core/widget'
import { HtmlNode } from '../core/html-container'
import { Button } from '../catalog/ui/button'
import { Input } from '../catalog/ui/input'
import { Display } from '../catalog/ui/display'
import { Modal } from '../catalog/ui/modal'
import { Fieldset } from '../catalog/ui/fieldset'
import { actions } from '../core/types'
import { name, door, address, zip } from './type'
import { App } from '../catalog/ux/app'
import { Get } from '../../http/catalog/ui/get'
import { actions as http } from '../../http/core/types'

/** Host columna: hijos uno debajo de otro. */
export class Col extends HtmlNode {
  constructor(port: Port = {}) {
    const el = document.createElement('div')
    el.className = 'flex flex-col gap-2 p-2 min-h-screen border border-black'
    super(el, port)
  }
}

/** Host fila: hijos en horizontal. */
export class Row extends HtmlNode {
  constructor(port: Port = {}) {
    const el = document.createElement('div')
    el.className = 'flex flex-row gap-2 p-2 flex-1 border border-blue-500'
    super(el, port)
  }
}

/** Panel genérico con host abierto + etiqueta. */
class Panel extends HtmlNode {
  constructor(label: string, className: string, port: Port = {}) {
    const el = document.createElement('div')
    el.className = className
    el.textContent = label
    super(el, port)
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
class ContentHost extends HtmlNode {
  constructor(port: Port = {}) {
    const el = document.createElement('div')
    el.className = 'flex flex-col gap-2 p-2 flex-1 border border-red-500'
    super(el, port)
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
      {
        child: Input,
        port: {
          input: name,
          trigger: { action: actions.change, state: 'finished' },
        }
      },
      { child: Input, port: { input: door } },
      {
        child: Input,
        port: {
          input: name,
          trigger: { action: actions.change, state: 'finished' },
        },
      },
      {
        child: Display,
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

/** La orden: verb 'load' (no es un submit: no se envía nada, se pide). */
const load = { action: http.load, state: 'verb' } as const

/**
 * Demo http: inputs que no son del usuario.
 * El botón ordena 'load' y los Get la cumplen (loading → loaded | failed).
 * - Get(address): su entrada del catálogo → 'loaded' → Fieldset(address) la desglosa.
 * - Get(zip): no está en el catálogo → 'failed' sube hasta Page → Modal.
 * Este layout no sabe de address: solo de load y fail.
 */
export class HttpDemo extends Widget {
  constructor(port: Port = {}) {
    super(new ContentHost(), [
      {
        child: Button,
        port: { relations: [{ trigger: load, triggers: [actions.click] }] },
      },
      { child: Get, port: { input: address, trigger: load } },
      { child: Get, port: { input: zip, trigger: load } },
      {
        child: Fieldset,
        port: { input: address, trigger: { action: http.load, state: 'finished' } },
      },
    ], port)
  }
}

export class ContentWidget extends Widget {
  constructor(port: Port = {}) {
    super(new ContentHost(), [
      { child: HttpDemo, port: {} },
      { child: DemoWidget, port: {} },
    ])
  }
}


/** main: left | DemoWidget | right */
export class Main extends Widget {
  constructor(port: Port = {}) {
    super(new Row(), [
      { child: LeftPanel, port: {} },
      { child: ContentWidget, port: {} },
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
      // la carcasa: se abre sola cuando un 'failed' llega a este nivel
      {
        child: Modal,
        port: { input: 'Error', trigger: { action: http.fail, state: 'finished' } },
      },
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
