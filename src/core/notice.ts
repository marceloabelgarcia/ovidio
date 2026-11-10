/** Aviso de la carcasa hacia el Widget (luego podrá ascender). */
export type Notice = (event: string, payload?: unknown) => void

/** Bus mínimo para que el shell emita sin DOM ni Father. */
export function createNotice() {
  const listeners = new Set<Notice>()
  return {
    on(listener: Notice) {
      listeners.add(listener)
    },
    emit(event: string, payload?: unknown) {
      for (const listener of listeners) listener(event, payload)
    },
  }
}
