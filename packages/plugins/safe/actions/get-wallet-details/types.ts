import { z } from 'zod';

import type { SafeActionResult } from '../types';
import type { GetWalletDetailsInputSchema } from './input-schema';

export type GetWalletDetailsSchemaType = typeof GetWalletDetailsInputSchema;

export type GetWalletDetailsArgumentsType = z.infer<GetWalletDetailsSchemaType>;

export type GetWalletDetailsResultBodyType = {
  address: string;
};

export type GetWalletDetailsActionResultType =
  SafeActionResult<GetWalletDetailsResultBodyType>;
