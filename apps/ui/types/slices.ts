import { Chain, Hex } from 'viem';
import { ServerWallet } from './server-wallet';

export interface ApplicationSlice {
  showGlobalLoading: boolean;
  chain: Chain;
  chatId: string | null;
  safeWallet: Hex | null;
  serverWallet: ServerWallet | null;

  setGlobalLoading: (val: boolean) => void;
  setChain: (val: Chain | undefined) => void;
  setChatId: (val: string) => void;
  setSafeWallet: (val: Hex | null) => void;
  setServerWallet: (val: ServerWallet | null) => void;
  resetAppData: () => void;
}
