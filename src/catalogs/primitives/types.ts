/**
 * Runtime TS de una primitiva sin UI (config/work).
 * El adaptador DOM y futuros conectores comparten el mismo `create*`.
 */
export type PrimitiveRuntimeFactory = (ctx: {
  name?: string;
  getValue: () => unknown;
  dispatch: (message: {
    verb: string;
    type: null;
    value: unknown;
  }) => void;
}) => {
  run: () => void | Promise<void>;
};

/**
 * Entrada del catálogo de primitivas.
 * — `component`: runtime (Vue Component allí; CustomElementConstructor aquí)
 * — `runtime`: lógica TS opcional
 */
export type PrimitiveEntry = {
  component: CustomElementConstructor;
  /** Props fijas de construcción (p. ej. type HTML). */
  binds?: Record<string, unknown>;
  runtime?: PrimitiveRuntimeFactory;
};

/** Hojas de una familia (`string`, `trigger`, …). */
export type PrimitiveFamily = Record<string, PrimitiveEntry>;
