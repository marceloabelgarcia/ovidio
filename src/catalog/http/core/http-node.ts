import { Mother } from 'core/mother'
import { Node } from 'core/node'

/**
 * Mother de red: su realidad no se ve, no tiene hijos que colgar.
 * Dentro de un layout HTML, HtmlNode.append la ignora, pero el dispatch
 * la conecta igual (parent / triggers), así que emite y recibe execute.
 */
export class HttpNode extends Mother {
  append(_child: Node): void {}
}
