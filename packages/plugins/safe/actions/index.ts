import {
  InvokeAction,
  InvokeActionSchemaAny,
  SafeAction,
  SafeActionSchemaAny,
} from './types';

import { agents } from '../agents';
import { GetBalanceAction } from './get-balance';
import { GetWalletDetailsAction } from './get-wallet-details';
import { InvokeAgentAction } from './invoke-agent';
import { TradeAction } from './trade';
import { TransferAction } from './transfer';

export function getAllSafeActions(): SafeAction<SafeActionSchemaAny, any>[] {
  return [
    new GetWalletDetailsAction(),
    new GetBalanceAction(),
    new TradeAction(),
    new TransferAction(),
  ];
}

export const SAFE_ACTIONS = getAllSafeActions();

export function getAllInvokeActions(): InvokeAction<
  InvokeActionSchemaAny,
  any
>[] {
  return [new InvokeAgentAction(agents)];
}

export const INVOKE_ACTIONS = getAllInvokeActions();

export * from './get-balance';
export * from './get-token-address';
export * from './get-wallet-details';
export * from './invoke-agent';
export * from './names';
export * from './trade';
export * from './transfer';
export * from './types';
