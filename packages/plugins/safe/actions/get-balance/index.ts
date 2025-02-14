import { SafeAction } from '../types';
import { getBalance } from './function';
import { GetBalanceInputSchema } from './input-schema';
import { GET_BALANCE_NAME } from './name';
import { GET_BALANCE_PROMPT } from './prompt';
import { GetBalanceResultBodyType } from './types';

/**
 * Get wallet ETH balance action.
 */
export class GetBalanceAction
  implements SafeAction<typeof GetBalanceInputSchema, GetBalanceResultBodyType>
{
  public name = GET_BALANCE_NAME;
  public description = GET_BALANCE_PROMPT;
  public argsSchema = GetBalanceInputSchema;
  public func = getBalance;
}
