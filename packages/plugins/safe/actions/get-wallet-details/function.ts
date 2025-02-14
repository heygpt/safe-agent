import Safe from '@safe-global/protocol-kit';

import type { SafeActionResult } from '../types';
import type {
  GetWalletDetailsArgumentsType,
  GetWalletDetailsResultBodyType,
} from './types';

/**
 * Gets a wallet's details.
 *
 * @param wallet - The wallet to get details from.
 * @param _ - The input arguments for the action.
 * @returns A message containing the wallet details.
 */
export async function getWalletDetails(
  wallet: Safe,
  _: GetWalletDetailsArgumentsType
): Promise<SafeActionResult<GetWalletDetailsResultBodyType>> {
  try {
    const [defaultAddress, chainId, threshold, owners] = await Promise.all([
      wallet.getAddress(),
      wallet.getChainId(),
      wallet.getThreshold(),
      wallet.getOwners(),
    ]);

    return {
      message: `Wallet: ${defaultAddress} on network: ${chainId} has ${threshold} thresholds.`,
      body: {
        address: defaultAddress,
        owners,
        threshold,
      },
    };
  } catch (error) {
    return {
      message: `Error getting wallet details: ${error}`,
    };
  }
}
