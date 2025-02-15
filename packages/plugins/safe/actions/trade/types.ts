import { z } from 'zod';

import type { SafeActionResult } from '../types';
import type { TradeInputSchema } from './input-schema';

export type TradeSchemaType = typeof TradeInputSchema;

export type TradeArgumentsType = z.infer<TradeSchemaType>;

export type TradeResultBodyType = {
  safeTransactionHash: string;
  amountOut: number;
  symbolOut?: string;
};

export type TradeActionResultType = SafeActionResult<TradeResultBodyType>;
