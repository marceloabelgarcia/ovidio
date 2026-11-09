import { Primitives as UXPrimitives } from '../ux';
import type { TypeShell, WidgetFactory, WidgetDecl } from './types';

export type {
  NodeWidget,
  WidgetFactory,
  TypeShell,
  WidgetDecl,
} from './types';

/**
 * Catálogo de widgets: solo declaración.
 *
 * Edit = Fields (recurso) + Actions (comandos).
 * Fetch no es TypeShell: es hoja `work.fetch` (obrero, no UI).
 */

const Input: TypeShell = {
  container: 'Field',
  prefix: 'ui.input',
};

const Output: TypeShell = {
  container: 'Field',
  prefix: 'ui.output',
};

const Submit: TypeShell = {
  prefix: 'ui.trigger',
};

const Configuration: WidgetFactory = ({ port, name }) => ({
  name: name ?? 'Configuration',
  port: {
    input: port?.input,
    trigger: port?.trigger ?? 'init',
  },
  children: [
    {
      name: name ?? 'Configuration',
      port: { input: 'config.input' },
    },
  ],
});

const Fetch: WidgetFactory = ({ port, name }) => ({
  name: name ?? 'Fetch',
  port: {
    input: port?.input,
    trigger: port?.trigger ?? 'submitted',
  },
  children: [
    {
      name: name ?? 'Fetch',
      port: { input: 'work.fetch' },
    },
  ],
});

const Save: WidgetFactory = ({ port }) => ({
  name: 'Save',
  port,
  children: [
    { template: 'Submit', port: { input: 'submit' } },
    {
      template: 'Fetch',
      port: {
        input: port?.input,
        trigger: 'submitted',
      },
    },
  ],
});

const Fields: WidgetFactory = ({ port }) => ({
  name: 'Fields',
  container: 'Form',
  port,
  children: [
    { template: 'Input', port: { input: port?.input, trigger: 'changed' } },
    { template: 'Output', port: { input: port?.input, trigger: 'changed' } },
  ],
});

const Actions: WidgetFactory = ({ port }) => ({
  name: 'Actions',
  container: 'Actions',
  port,
  children: [
    {
      template: 'Save',
      port: {
        input: port?.input,
        trigger: 'saved',
      },
    },
  ],
});

const Edit: WidgetFactory = ({ port }) => ({
  name: 'Edit',
  container: 'App',
  port,
  children: [
    { template: 'Fields', port },
    { template: 'Actions', port },
  ],
});

const Service: WidgetFactory = ({ port }) => ({
  name: 'Service',
  port,
  children: [{ template: 'Service', port }],
});

const Services: WidgetFactory = ({ port }) => ({
  name: 'Services',
  port,
  children: [{ template: 'Configuration', port }],
});

const Demo: WidgetFactory = ({ port }) => ({
  name: 'Demo',
  port,
  children: [
    { template: 'Edit', port },
    { template: 'Services', port },
  ],
});

const WidgetCatalog: Record<string, WidgetDecl> = {
  Input,
  Output,
  Submit,
  Configuration,
  Fetch,
  Save,
  Fields,
  Actions,
  Edit,
  Service,
  Services,
  Demo,
};

/** En ovidio `primitives` son tags CE (strings), no Component Vue. */
const WidgetUX = {
  Edit: { primitives: UXPrimitives.App },
  Fields: { primitives: UXPrimitives.Form },
  Actions: { primitives: UXPrimitives.Actions },
  Input: { primitives: UXPrimitives.Field },
  Output: { primitives: UXPrimitives.Field },
};

export { WidgetCatalog, WidgetUX };
