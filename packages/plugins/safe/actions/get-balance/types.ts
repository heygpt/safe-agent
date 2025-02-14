import { z } from 'zod';

import type { SafeActionResult } from '../types';
import type { GetBalanceInputSchema } from './input-schema';

export type GetBalanceSchemaType = typeof GetBalanceInputSchema;

export type GetBalanceArgumentsType = z.infer<GetBalanceSchemaType>;

export type GetBalanceResultBodyType = {
  balance: bigint;
};

export type GetBalanceActionResultType =
  SafeActionResult<GetBalanceResultBodyType>;
