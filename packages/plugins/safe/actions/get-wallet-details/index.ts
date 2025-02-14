import { SafeAction } from '../types';
import { getWalletDetails } from './function';
import { GetWalletDetailsInputSchema } from './input-schema';
import { GET_WALLET_DETAILS_NAME } from './name';
import { GET_WALLET_DETAILS_PROMPT } from './prompt';
import { GetWalletDetailsResultBodyType } from './types';

export class GetWalletDetailsAction
  implements
    SafeAction<
      typeof GetWalletDetailsInputSchema,
      GetWalletDetailsResultBodyType
    >
{
  public name = GET_WALLET_DETAILS_NAME;
  public description = GET_WALLET_DETAILS_PROMPT;
  public argsSchema = GetWalletDetailsInputSchema;
  public func = getWalletDetails;
}
