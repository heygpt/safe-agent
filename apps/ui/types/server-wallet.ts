export interface ServerWallet {
  id: string;
  address: string;
  chainType: 'ethereum' | 'solana';
  authorizationThreshold: number | undefined;
}
