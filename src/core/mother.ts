import { Action, Output, Port, TriggerRelation } from './types'
import type { Widget } from './widget'
import { Node } from './node'
import { triggerKey } from './resource'

export type Child = {
  child: new (port?: Port) => Widget
  port?: Port
}

export type Children = Child[]

/**
 * Vivienda del árbol de realidad (Node). No es Resource ni Widget.
 * El producto que la usa queda en `widget`.
 */
export abstract class Mother extends Node {
  port: Port = {}
  /** Widget dueño (producto). Lo asigna Widget al montar. */
  widget: Widget | null = null
  children: Children = []

  constructor(port: Port = {}) {
    super()
    this.port = port
  }
  

  /** Cuando la realidad ya existe: relations DOM → addListeners. */
  protected bindRelations(): void {
    // un listener DOM por par (evento DOM → trigger emitido); repetido = dispatch doble
    const bound = new Set<string>()
    Array.isArray(this.port.relations) &&
      this.port.relations.forEach((relation) => {
        relation?.triggers?.forEach((action) => {
          const pair = `${action.verb}→${triggerKey(relation.trigger)}`
          if (bound.has(pair)) return
          bound.add(pair)
          this.addListeners(action, relation)
        })
      })
  }

  /** Instancia la receta, cuelga cada child.mother en this (somos el host) y devuelve los hijos. */
  appendChildren(children: Children): Widget[] {
    this.children = children
    return children.map(({ child: Child, port }) => {
      const child = new Child(port)
      this.append(child.mother)
      child.mother.parent = this
      child.parent = this.widget
      return child
    })
  }

  /** Hook DOM (ButtonContainer, InputContainer, …). */
  protected addListeners(_action: Action, _relation: TriggerRelation): void {}

  /** Hook realidad: qué hace esta vivienda cuando su widget recibe una orden. */
  execute(_output: Output): void {}
}
