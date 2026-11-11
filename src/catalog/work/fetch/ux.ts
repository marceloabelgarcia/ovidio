import { subjects, type PrimitiveEvent, type ShellApi } from '~/core'

/**
 * Carcasa del viaje.
 * — máquina: sending / sended
 * — dato: sended + value
 */
export class Ux {
  react(_event: PrimitiveEvent, api: ShellApi): void {
    const type = api.port.input ?? 'name'

    api.notifyMachine('sending', { type })

    this.#run((value) => {
      api.notifyMachine('sended', { type })
      api.notifyParent({
        subject: subjects.fetch,
        verb: 'sended',
        type,
        value,
      })
    })
  }

  #run(onDone: (value: string) => void): void {
    setTimeout(() => {
      onDone('Cortijo Benitez')
    }, 1500)
  }
}
