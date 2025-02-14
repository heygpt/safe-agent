import Safe from '@safe-global/protocol-kit';

import { type Chain, Hex } from 'viem';
import { sepolia } from 'viem/chains';
import { z } from 'zod';
import {
  SafeAction,
  SafeActionResult,
  SafeActionSchemaAny,
} from './actions/types';

/**
 * Configuration options for the Safe Walletkit
 */
interface SafeWalletkitOptions {
  wallet: Safe;
  chain: Chain;
  safeAddress?: Hex;
  walletId?: string;
}

class SafeWalletError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'SafeWalletError';
  }
}

/**
 * Safe Walletkit
 */
export class SafeWalletkit {
  private wallet: Safe | undefined;
  private chain: Chain;
  private safeAddress?: Hex;
  private walletId?: string;

  /**
   * Initializes a new Safe Walletkit instance
   *
   * @param config - Configuration options for the Safe Walletkit
   */
  public constructor({
    walletId,
    chain,
    safeAddress,
    wallet,
  }: SafeWalletkitOptions) {
    // if (!walletId) {
    //   throw new Error('walletId is required but not provided');
    // }
    this.walletId = walletId;
    this.chain = chain || sepolia;
    this.safeAddress = safeAddress;
    this.wallet = wallet;
  }

  /**
   * Configures Safe Walletkit with a Wallet.
   *
   * @param config - Optional configuration parameters
   * @returns A Promise that resolves to a new SafeWalletkit instance
   * @throws Error if required environment variables are missing or wallet initialization fails
   */
  public static async configureWithWallet(
    config: SafeWalletkitOptions
  ): Promise<SafeWalletkit> {
    let walletkit: SafeWalletkit;

    try {
      walletkit = new SafeWalletkit(config);
    } catch (error) {
      throw new SafeWalletError(
        `Failed to initialize Safe: ${error instanceof Error ? error.message : String(error)}`
      );
    }

    return walletkit;
  }

  /**
   * Executes a Safe action
   *
   * @param action - The Safe action to execute
   * @param args - Arguments for the action
   * @returns Result of the action execution
   * @throws Error if action execution fails
   */
  async run<TActionSchema extends SafeActionSchemaAny, TResultBody>(
    action: SafeAction<TActionSchema, TResultBody>,
    args: TActionSchema
  ): Promise<SafeActionResult<TResultBody>> {
    if (!action.func) {
      throw new Error(`Action ${action.name} does not have a function defined`);
    }
    if (action.func.length > 1) {
      if (!this.wallet) {
        return {
          message: `Unable to run Safe Action: ${action.name}. A Wallet is required. Please configure Safe Walletkit with a Wallet to run this action.`,
        };
      }

      return await action.func(this.wallet!, args);
    }

    return await (
      action.func as (
        args: z.infer<TActionSchema>
      ) => Promise<SafeActionResult<TResultBody>>
    )(args);
  }
}
