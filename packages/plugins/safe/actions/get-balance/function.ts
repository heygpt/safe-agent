import Safe from '@safe-global/protocol-kit';
import { TokenBalance } from 'alchemy-sdk';
import type { SafeActionResult } from '../types';

import type {
  GetBalanceArgumentsType,
  GetBalanceResultBodyType,
} from './types';

/**
 * Gets token balances in the safe wallet.
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
    const [safeAddress, balance] = await Promise.all([
      wallet.getAddress(),
      wallet.getBalance(),
    ]);

    let tokenBalances: TokenBalance[] = [];
    try {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const raw = JSON.stringify({
        id: 1,
        jsonrpc: '2.0',
        method: 'alchemy_getTokenBalances',
        params: [safeAddress],
      });

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      const response = await fetch(
        `https://arb-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
        requestOptions
      );
      const result = await response.json();
      tokenBalances = result.result?.tokenBalances ?? [];
    } catch (error) {
      console.log('Get token balances error:::', error);
    }

    return {
      message: `ETH balances for wallet ${wallet.getOnchainIdentifier()}:\n${balance}`,
      body: {
        ethBalance: Number(balance),
        tokenBalances: tokenBalances,
      },
    };
  } catch (error) {
    return {
      message: `Error getting balance for all addresses in the wallet: ${error}`,
    };
  }
}
