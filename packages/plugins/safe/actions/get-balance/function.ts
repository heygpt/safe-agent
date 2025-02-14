import Safe from '@safe-global/protocol-kit';

import type { SafeActionResult } from '../types';

import type {
  GetBalanceArgumentsType,
  GetBalanceResultBodyType,
} from './types';

/**
 * Gets ETH balance for all addresses in the wallet.
 *
 * @param wallet - The wallet to get the balance for.
 * @param _args - The input arguments for the action.
 * @returns A message containing the balance information.
 */
export async function getBalance(
  wallet: Safe,
  _args: GetBalanceArgumentsType
): Promise<SafeActionResult<GetBalanceResultBodyType>> {
  try {
    const balance = await wallet.getBalance();
    return {
      message: `Balances for wallet ${wallet.getOnchainIdentifier()}:\n${balance}`,
      body: {
        balance: Number(balance),
      },
    };
  } catch (error) {
    return {
      message: `Error getting balance for all addresses in the wallet: ${error}`,
    };
  }
}
