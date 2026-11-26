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
import { AppContainer } from '../catalog/ux/app'
import { RouterContainer } from '../catalog/ux/router'
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

/** La carcasa: se abre sola cuando un 'failed' llega a la página. */
const errorModal = {
  child: Modal,
  port: { input: 'Error', trigger: { action: http.fail, state: 'finished' } },
} as const

/** main: left | DemoWidget | right */
export class DemoMain extends Widget {
  constructor(port: Port = {}) {
    super(new Row(), [
      { child: LeftPanel, port: {} },
      { child: DemoWidget, port: {} },
      { child: RightPanel, port: {} },
    ], port)
  }
}

/** main: left | HttpDemo | right */
export class HttpMain extends Widget {
  constructor(port: Port = {}) {
    super(new Row(), [
      { child: LeftPanel, port: {} },
      { child: HttpDemo, port: {} },
      { child: RightPanel, port: {} },
    ], port)
  }
}

/** Página '/': header / DemoMain / footer. */
export class DemoPage extends Widget {
  constructor(port: Port = {}) {
    super(new Col(), [
      { child: Header, port: {} },
      { child: DemoMain, port: {} },
      { child: Footer, port: {} },
      errorModal,
    ], port)
  }
}

/** Página '/http': header / HttpMain / footer. */
export class HttpPage extends Widget {
  constructor(port: Port = {}) {
    super(new Col(), [
      { child: Header, port: {} },
      { child: HttpMain, port: {} },
      { child: Footer, port: {} },
      errorModal,
    ], port)
  }
}

/** Las rutas: cada página dice la suya en su input; se monta solo la que coincide. */
export class DemoRouter extends Widget {
  constructor(port: Port = {}) {
    super(new RouterContainer(port), [
      { child: DemoPage, port: { input: '/' } },
      { child: HttpPage, port: { input: '/http' } },
    ], port)
  }
}

/** Raíz cerrada: App(#app) → Router → página. */
export class DemoApp extends Widget {
  constructor(port: Port = {}) {
    super(new AppContainer(port), [{ child: DemoRouter, port: {} }], port)
  }
}
