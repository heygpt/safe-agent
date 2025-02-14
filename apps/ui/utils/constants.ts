import { zeroAddress } from 'viem';
import { base, sepolia } from 'wagmi/chains';

export const QUERY_GC_TIME = 20 * 1000; // 20 seconds
export const QUERY_REFETCH_INTERVAL = 5000; // 5 seconds
export const WALLET_CONNECT_CONNECTOR_ID = 'walletConnect';
export const ZERO_ADDRESS = zeroAddress;
export const DEFAULT_CHAIN = process.env.NODE_ENV === 'development' ? sepolia : base;

export const ACTION_NAMES = {
  GET_WALLET_ADDRESS_NAME: 'getWalletAddress',
  TRADE_NAME: 'trade',
  STAKE_NAME: 'stake',
  UNSTAKE_NAME: 'unstake',
  TRANSFER_NAME: 'transfer',
} as const;
