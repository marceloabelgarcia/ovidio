import { StringOutput } from './String';
import { string, integer, text } from '~/catalogs/type/types';

const Primitives = {
  [string]: StringOutput,
  [integer]: StringOutput,
  [text]: StringOutput,
} as const;

export type PrimitiveType = keyof typeof Primitives;
export { Primitives, StringOutput };
