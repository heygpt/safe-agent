import Safe from '@safe-global/protocol-kit';
import { searchTokens } from '../../services/birdeye';

import type { SafeActionResult } from '../types';
import type {
  GetTokenAddressArgumentsType,
  GetTokenAddressResultBodyType,
} from './types';

/**
 * Gets the token data for a given ticker.
 *
 * @param args - The input arguments for the action
 * @returns A message containing the token data
 */
export async function getTokenAddress(
  wallet: Safe,
  args: GetTokenAddressArgumentsType
): Promise<SafeActionResult<GetTokenAddressResultBodyType>> {
  try {
    const chainId = await wallet.getChainId();
    const token = await searchTokens({
      keyword: args.keyword,
      chainId: Number(chainId),
    });
    if (!token) {
      throw new Error('Failed to fetch token data');
    }

    const tokenAddress = token?.items[0]?.result[0]?.address;

    if (!tokenAddress) {
      throw new Error('Failed to fetch token address');
    }

    return {
      message: `Found token address for ${args.keyword}. The user is shown the following token address in the UI, DO NOT REITERATE THE TOKEN ADDRESS. Ask the user what they want to do next.`,
      body: {
        address: tokenAddress,
      },
    };
  } catch (error) {
    return {
      message: `Error getting token data: ${error}`,
    };
  }
}
