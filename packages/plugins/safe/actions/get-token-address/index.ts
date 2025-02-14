import { getTokenAddress } from './function';
import { GetTokenAddressArgumentsSchema } from './input-schema';
import { GET_TOKEN_ADDRESS_NAME } from './name';
import { GET_TOKEN_ADDRESS_PROMPT } from './prompt';

import type { SafeAction } from '../types';
import type { GetTokenAddressResultBodyType } from './types';

export class SolanaGetTokenAddressAction
  implements
    SafeAction<
      typeof GetTokenAddressArgumentsSchema,
      GetTokenAddressResultBodyType
    >
{
  public name = GET_TOKEN_ADDRESS_NAME;
  public description = GET_TOKEN_ADDRESS_PROMPT;
  public argsSchema = GetTokenAddressArgumentsSchema;
  public func = getTokenAddress;
}
