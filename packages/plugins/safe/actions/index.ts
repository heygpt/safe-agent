import { SafeAction, SafeActionSchemaAny } from './types';

import { GetBalanceAction } from './get-balance';
import { GetTokenAddressAction } from './get-token-address';
import { GetTokenDataAction } from './get-token-data';
import { GetWalletDetailsAction } from './get-wallet-details';
import { TradeAction } from './trade';
import { TransferAction } from './transfer';

export function getAllSafeActions(): SafeAction<SafeActionSchemaAny, any>[] {
  return [
    new GetWalletDetailsAction(),
    new GetBalanceAction(),
    new GetTokenAddressAction(),
    new GetTokenDataAction(),
    new TradeAction(),
    new TransferAction(),
  ];
}

export const SAFE_ACTIONS = getAllSafeActions();

export * from './get-balance';
export * from './get-token-address';
export * from './get-token-data';
export * from './get-wallet-details';
export * from './trade';
export * from './transfer';

export * from './names';
export * from './types';
