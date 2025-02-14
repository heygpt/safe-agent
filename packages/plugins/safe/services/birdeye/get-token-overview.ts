import { base } from 'viem/chains';
import { queryBirdeye } from './base';
import { BIRDEYE_CHAIN_MAP } from './constants';
import { TokenOverview } from './types/token-overview';

export const getTokenOverview = async (
  address: string,
  chainId: number = base.id
): Promise<TokenOverview> => {
  return await queryBirdeye<TokenOverview>(
    'defi/token_overview',
    BIRDEYE_CHAIN_MAP[chainId],
    { address }
  );
};
