import { Port } from 'core/types'
import { Widget } from 'core/widget'
import { actions as http } from 'catalog/services/core/types'
import { DemoWidget, HttpDemo } from 'catalog/form/example'
import { AppContainer } from 'catalog/html/ux/app'
import { RouterContainer } from 'catalog/html/ux/router'
import { Col } from 'catalog/html/ux/col'
import { Row } from 'catalog/html/ux/row'
import { Modal } from 'catalog/html/ux/modal'
import { Panel } from 'catalog/html/ux/panel'

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
