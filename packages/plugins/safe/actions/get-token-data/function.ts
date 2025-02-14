import Safe from '@safe-global/protocol-kit';
import { getTokenOverview, searchTokens } from '../../services/birdeye';
import type { SafeActionResult } from '../types';
import type {
  GetTokenDataArgumentsType,
  GetTokenDataResultBodyType,
} from './types';

/**
 * Gets the token data for a given symbol.
 *
 * @param args - The input arguments for the action
 * @returns A message containing the token data
 */
export async function getTokenData(
  wallet: Safe,
  args: GetTokenDataArgumentsType
): Promise<SafeActionResult<GetTokenDataResultBodyType>> {
  try {
    const chainId = await wallet.getChainId();
    const { items } = await searchTokens({
      keyword: args.search,
      chainId: Number(chainId),
    });

    const token = items?.[0]?.result?.[0];

    if (!token) {
      return {
        message: `No token found for ${args.search}`,
      };
    }

    return {
      message: `Token data for ${args.search}`,
      body: {
        token: await getTokenOverview(token.address),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      message: `Error getting token data: ${error}`,
    };
  }
}
