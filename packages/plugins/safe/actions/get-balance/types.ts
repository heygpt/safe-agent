import { z } from 'zod';

import { TokenBalance } from 'alchemy-sdk';
import type { SafeActionResult } from '../types';
import type { GetBalanceInputSchema } from './input-schema';

export type GetBalanceSchemaType = typeof GetBalanceInputSchema;

export type GetBalanceArgumentsType = z.infer<GetBalanceSchemaType>;

export type GetBalanceResultBodyType = {
  ethBalance: number;
  tokenBalances: TokenBalance[];
};

export type GetBalanceActionResultType =
  SafeActionResult<GetBalanceResultBodyType>;
