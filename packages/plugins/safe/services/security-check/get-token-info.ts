import { Hex } from 'viem';
import { querySecurityChecks } from './base';
import { TokenInfo } from './types';

export const getTokenInfo = async (
  tokenAddress: Hex,
  chainId: number
): Promise<TokenInfo> => {
  return querySecurityChecks<TokenInfo>(
    `/v2/token_approval_security/${chainId}`,
    {
      addresses: tokenAddress,
    }
  );
};
