import { getTokenData } from './function';
import { GetTokenDataInputSchema } from './input-schema';
import { GET_TOKEN_DATA_NAME } from './name';
import { GET_TOKEN_DATA_PROMPT } from './prompt';

import type { SafeAction } from '../types';
import type { GetTokenDataResultBodyType } from './types';

export class GetTokenDataAction
  implements
    SafeAction<typeof GetTokenDataInputSchema, GetTokenDataResultBodyType>
{
  public name = GET_TOKEN_DATA_NAME;
  public description = GET_TOKEN_DATA_PROMPT;
  public argsSchema = GetTokenDataInputSchema;
  public func = getTokenData;
}
