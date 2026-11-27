import { Port } from 'core/types'
import { Widget } from 'core/widget'
import { HtmlContainer } from 'catalog/html/core/html-container'
import { actions } from 'catalog/html/core/types'
import { actions as http } from 'catalog/http/core/types'
import { Button } from 'catalog/app/slot'
import { Display, Get, Input } from '../primitive'
import { Fieldset } from '../slot'
import { actions as form } from '../triggers'
import { name, door, address, zip } from '../types'

/** Host del contenido central (abierto). */
class ContentContainer extends HtmlContainer {
  constructor(port: Port = {}) {
    const el = document.createElement('div')
    el.className = 'flex flex-col gap-2 p-2 flex-1 border border-red-500'
    super(el, port)
  }
}

/** Contenido del demo: button + inputs. */
export class DemoWidget extends Widget {
  constructor(port: Port = {}) {
    super(new ContentContainer(), [
      {
        child: Button,
        port: {
          relations: [
            {
              trigger: { action: form.submit, state: 'finished' },
              triggers: [{ action: actions.click, state: 'finished' }],
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
      // el contrato que le dio su padre se respeta; su relation propia se suma
      ...port,
      relations: [
        {
          trigger: { action: form.save, state: 'finished' },
          triggers: [{ action: form.submit, state: 'finished' }],
        },
        ...(port.relations ?? []),
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
    super(new ContentContainer(), [
      {
        child: Button,
        port: { relations: [{ trigger: load, triggers: [{ action: actions.click, state: 'finished' }] }] },
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
