import { z } from 'zod';

import { GetTokenDataInputSchema } from './input-schema';

import type { TokenOverview } from '../../services/birdeye/types';
import type { SafeActionResult } from '../types';

export type GetTokenDataSchemaType = typeof GetTokenDataInputSchema;

export type GetTokenDataArgumentsType = z.infer<GetTokenDataSchemaType>;

export type GetTokenDataResultBodyType = {
  token: TokenOverview;
};

export type GetTokenDataResultType =
  SafeActionResult<GetTokenDataResultBodyType>;
