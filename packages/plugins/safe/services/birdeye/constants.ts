import {
  arbitrum,
  avalanche,
  base,
  bsc,
  mainnet,
  optimism,
  polygon,
} from 'viem/chains';

export const BIRDEYE_CHAIN_MAP: Record<number, string> = {
  [mainnet.id]: 'ethereum',
  [arbitrum.id]: 'arbitrum',
  [avalanche.id]: 'avalanche',
  [bsc.id]: 'bsc',
  [optimism.id]: 'optimism',
  [polygon.id]: 'polygon',
  [base.id]: 'base',
};
