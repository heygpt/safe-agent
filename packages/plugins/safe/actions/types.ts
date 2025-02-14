import Safe from '@safe-global/protocol-kit';
import { z } from 'zod';
import {
  BaseAction,
  BaseActionResult,
  BaseActionSchemaAny,
} from '../base-action';

/**
 * Represents the structure for Safe Actions.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SafeActionSchemaAny = BaseActionSchemaAny;
export type SafeActionResult<TBody> = BaseActionResult<TBody>;
export interface SafeAction<TActionSchema extends SafeActionSchemaAny, TBody>
  extends BaseAction<TActionSchema, TBody, Safe> {
  /**
   * The function to execute for this action
   */
  func?:
    | ((
        wallet: Safe,
        args: z.infer<TActionSchema>
      ) => Promise<SafeActionResult<TBody>>)
    | ((args: z.infer<TActionSchema>) => Promise<SafeActionResult<TBody>>);
}

/**
 * Represents the structure for Invoke Actions.
 */
export type InvokeActionSchemaAny = BaseActionSchemaAny;
export type InvokeActionResult<TBody> = BaseActionResult<TBody>;
export interface InvokeAction<
  TActionSchema extends InvokeActionSchemaAny,
  TBody,
> extends BaseAction<TActionSchema, TBody> {}

export * from './get-balance/types';
export * from './get-wallet-details/types';
export * from './invoke-agent/types';
export * from './trade/types';
export * from './transfer/types';
