/**
 * Contratos de hoja (changer / worker) — fuera de widget/.
 * widget/ solo orquesta NodeWidget; las hojas CE usan esto.
 */
export type PrimitiveEvent = {
  subject: string;
  verb: string;
  type?: string;
  value?: unknown;
};

export type Emit = (event: PrimitiveEvent) => void;
export type Trigger = (event?: PrimitiveEvent) => void | Promise<void>;
export type Triggers = Record<string, Trigger>;

export const subjects = {
  user: 'the_user',
  fetch: 'the_fetch',
} as const;

export type Changer = {
  connect(emit: Emit): void;
};

export type Worker = {
  readonly triggers: Triggers;
};

export function changedEvent(
  type: string | undefined,
  value: unknown,
  subject: string = subjects.user,
): PrimitiveEvent {
  return { subject, verb: 'changed', type, value };
}

export function submittedEvent(
  type: string | undefined,
  value: unknown,
  subject: string = subjects.user,
): PrimitiveEvent {
  return { subject, verb: 'submitted', type, value };
}
