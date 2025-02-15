import { RouteParams } from '@ensofinance/sdk';
import SafeApiKit from '@safe-global/api-kit';
import Safe from '@safe-global/protocol-kit';
import {
  createPublicClient,
  erc20Abi,
  formatUnits,
  Hex,
  http,
  parseUnits,
} from 'viem';
import { addressValidation, networkMappings } from '../../helpers/helper';
import { ensoClient } from '../../services/enso';
import type { TradeActionResultType, TradeArgumentsType } from './types';

export async function trade(
  wallet: Safe,
  args: TradeArgumentsType
): Promise<TradeActionResultType> {
  try {
    const chainId = await wallet.getChainId();
    const chain = networkMappings[Number(chainId)];
    const safeAddress = await wallet.getAddress();
    const sender = await wallet.getSafeProvider().getSignerAddress();

    // Safety check to ensure the tokenOut is valid
    await addressValidation(args.tokenOut as Hex, args.tokenOut as Hex, chain);

    const publicClient = createPublicClient({
      chain: networkMappings[Number(chainId)],
      transport: http(),
    });
    const wagmiContract = {
      address: args.tokenIn,
      abi: erc20Abi,
    } as const;
    const wagmiContractOut = {
      address: args.tokenOut,
      abi: erc20Abi,
    } as const;

    const [balance, decimals, decimalsOut, symbolOut] =
      await publicClient.multicall({
        contracts: [
          {
            ...wagmiContract,
            functionName: 'balanceOf',
            args: [safeAddress],
          },
          {
            ...wagmiContract,
            functionName: 'decimals',
          },
          {
            ...wagmiContractOut,
            functionName: 'decimals',
          },
          {
            ...wagmiContractOut,
            functionName: 'symbol',
          },
        ],
      });
    const amountInParsed = parseUnits(
      args.amountIn.toString(),
      decimals.result || 18
    );
    if (
      balance.result === 0n ||
      (balance.result && balance.result < amountInParsed)
    ) {
      throw new Error('Insufficient balance');
    }

    const routeParams: RouteParams = {
      chainId: Number(chainId),
      tokenIn: args.tokenIn as Hex,
      tokenOut: args.tokenOut as Hex,
      amountIn: amountInParsed.toString(),
      fromAddress: safeAddress as Hex,
      receiver: (args.recipient || safeAddress) as Hex, // Optional
      spender: safeAddress as Hex, // Optional
    };
    const routeData = await ensoClient.getRouterData(routeParams);
    const tx = await wallet.createTransaction({
      transactions: [routeData.tx],
    });

    const safeTxHash = await wallet.getTransactionHash(tx);
    const sig = await wallet.signHash(safeTxHash);

    const apiKit = new SafeApiKit({
      chainId,
    });
    await apiKit.proposeTransaction({
      safeAddress: safeAddress,
      safeTransactionData: tx.data,
      safeTxHash,
      senderSignature: sig.data,
      senderAddress: sender as Hex,
    });

    const formattedAmountOut = Number(
      formatUnits(BigInt(routeData.amountOut), decimalsOut.result || 18)
    );

    return {
      message: `Transaction has been proposed to Safe Wallet for the trade ${args.amountIn} of ${args.tokenIn} for ${formattedAmountOut} of ${args.tokenOut}.`,
      body: {
        safeTransactionHash: safeTxHash,
        amountOut: formattedAmountOut,
        symbolOut: symbolOut.result,
      },
    };
  } catch (error) {
    return {
      message: `Error trading assets: ${error}`,
    };
  }
}
