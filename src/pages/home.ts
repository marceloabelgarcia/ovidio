import template from './home.html?raw';
import type { UiActions } from '../ui/actions/actions';
import type { UiCard } from '../ux/card/card';

/** Monta el HTML de la página (composición) y cablea comportamiento. */
export function HomePage(): HTMLElement {
  const host = document.createElement('div');
  host.innerHTML = template.trim();
  const page = host.firstElementChild;
  if (!(page instanceof HTMLElement)) {
    throw new Error('home.html debe tener un elemento raíz');
  }

  wireDemoCard(page);
  return page;
}

function wireDemoCard(page: HTMLElement) {
  const card = page.querySelector('#demo-card') as UiCard | null;
  const actions = page.querySelector('#demo-actions') as UiActions | null;
  const mutate = page.querySelector('[data-mutate]');
  const apply = page.querySelector('[data-apply]');
  if (!card || !actions || !mutate || !apply) return;

  let n = 0;

  mutate.addEventListener('click', () => {
    n += 1;
    card.setAttribute('title', `Mutado #${n}`);
    card.setAttribute('badge', `v${n}`);
    actions.setNote(
      'Attributes cambiados en el DOM, pero el UI del card no se enteró (sin reactividad de props).',
    );
  });

  apply.addEventListener('click', () => {
    card.applyProps();
    actions.setNote('applyProps() leído a mano → ahora sí se ve el título/badge nuevos.');
  });
}
