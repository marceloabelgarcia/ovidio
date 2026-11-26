import { Mother } from 'core/mother'

/**
 * Mother de red: su realidad no se ve, no tiene hijos que colgar.
 * Dentro de un layout HTML, HtmlContainer.append la ignora, pero el dispatch
 * la conecta igual (jefe y hermanos), así que emite y recibe execute.
 */
export class HttpContainer extends Mother {
  append(_child: Mother): void {}
}
