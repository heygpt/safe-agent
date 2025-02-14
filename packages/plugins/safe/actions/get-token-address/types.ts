import { z } from 'zod';

import { SafeActionResult } from '../types';
import { GetTokenAddressArgumentsSchema } from './input-schema';

export type GetTokenAddressSchemaType = typeof GetTokenAddressArgumentsSchema;

export type GetTokenAddressArgumentsType = z.infer<GetTokenAddressSchemaType>;

export type GetTokenAddressResultBodyType = {
  address: string;
};

export type GetTokenAddressResultType =
  SafeActionResult<GetTokenAddressResultBodyType>;
