import Safe from '@safe-global/protocol-kit';
import crypto from 'crypto';
import { type Chain, Hex } from 'viem';
import { baseSepolia } from 'viem/chains';
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
  safeAddress: Hex;
  walletId?: string;
  chain?: Chain;
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
  private wallet: Safe;
  private chain: Chain;
  private safeAddress: Hex;

  /**
   * Initializes a new Safe Walletkit instance
   *
   * @param config - Configuration options for the Safe Walletkit
   */
  public constructor({ walletId, chain, safeAddress }: SafeWalletkitOptions) {
    if (!walletId) {
      throw new Error('walletId is required but not provided');
    }

    this.chain = chain || baseSepolia;
    this.safeAddress = safeAddress;
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
    const walletkit = new SafeWalletkit(config);

    const { PRIVY_AUTHORIZATION_KEY } = process.env;
    if (!PRIVY_AUTHORIZATION_KEY) {
      throw new Error('PRIVY_AUTHORIZATION_KEY is not set');
    }

    const privateKeyAsString = PRIVY_AUTHORIZATION_KEY?.replace(
      'wallet-auth:',
      ''
    );
    const privateKeyAsPem = `-----BEGIN PRIVATE KEY-----\n${privateKeyAsString}\n-----END PRIVATE KEY-----`;
    const privateKey = crypto.createPrivateKey({
      key: privateKeyAsPem,
      format: 'pem',
    });
    const privateKeyString = privateKey.export({
      type: 'pkcs8',
      format: 'pem',
    });

    try {
      const preExistingSafe = await Safe.init({
        provider: walletkit.chain.rpcUrls.default.http[0],
        signer: privateKeyString as string,
        safeAddress: walletkit.safeAddress,
      });
      walletkit.wallet = preExistingSafe;
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
