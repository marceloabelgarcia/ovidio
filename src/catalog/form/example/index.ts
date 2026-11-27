import { Port } from 'core/types'
import { Widget } from 'core/widget'
import { actions } from 'catalog/html/core/types'
import { actions as http } from 'catalog/services/core/types'
import { Button } from 'catalog/html/ux/button'
import { Get } from 'catalog/services/fetch/get'
import { Display } from 'catalog/html/ux/display'
import { Input } from 'catalog/html/ui/input'
import { Fieldset, FieldsetContainer } from 'catalog/html/ux/fieldset'
import { ContentContainer } from 'catalog/html/ux/content'
import { Breakdown } from 'core/breakdown'
import { actions as form } from '../triggers'
import { name, door, address, zip } from '../types'

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

/** Prueba de Breakdown: el mismo desglose que Fieldset, pero editable (la hoja es Input). */
class EditableFieldset extends Breakdown {
  static place = FieldsetContainer
  static leaf = Input
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
      {
        child: EditableFieldset,
        port: { input: address, trigger: { action: http.load, state: 'finished' } },
      },
    ], port)
  }
}
