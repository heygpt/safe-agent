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
    const defaultAddress = await wallet.getAddress();
    return {
      message: `Wallet: ${wallet.getOnchainIdentifier()} on network: ${wallet.getChainId()} has ${wallet.getThreshold()} thresholds with default address: ${defaultAddress}`,
      body: {
        address: defaultAddress,
      },
    };
  } catch (error) {
    return {
      message: `Error getting wallet details: ${error}`,
    };
  }
}
