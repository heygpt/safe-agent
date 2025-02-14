import SafeApiKit from '@safe-global/api-kit';
import Safe from '@safe-global/protocol-kit';
import { MetaTransactionData, OperationType } from '@safe-global/types-kit';
import { Hex, isAddress, parseEther } from 'viem';
import { addressValidation, networkMappings } from '../../helpers/helper';
import type { TransferActionResultType, TransferArgumentsType } from './types';

// Only supports native token transfer for now
// TODO: Add support for besides native token, also other tokens
export async function transfer(
  wallet: Safe,
  args: TransferArgumentsType
): Promise<TransferActionResultType> {
  try {
    if (!isAddress(args.recipient)) {
      throw new Error('Invalid recipient address');
    }
    const safeAddress = await wallet.getAddress();
    const signerAddress = await wallet.getSafeProvider()?.getSignerAddress();
    const chainId = await wallet.getChainId();
    const chain = networkMappings[Number(chainId)];

    await addressValidation(
      args.recipient as Hex,
      args.assetAddress as Hex,
      chain
    );

    const parsedAmount = parseEther(args.amount.toString());
    const safeTransactionData: MetaTransactionData = {
      to: args.recipient,
      value: parsedAmount.toString(),
      data: '0x',
      operation: OperationType.Call,
    };

    const tx = await wallet.createTransaction({
      transactions: [safeTransactionData],
    });
    const safeTxHash = await wallet.getTransactionHash(tx);
    const sig = await wallet?.signHash(safeTxHash);

    const apiKit = new SafeApiKit({
      chainId: BigInt(chain.id),
    });
    await apiKit.proposeTransaction({
      safeAddress,
      safeTransactionData: tx.data,
      safeTxHash,
      senderSignature: sig.data,
      senderAddress: signerAddress as string,
    });

    return {
      message: `A transfer transaction has been proposed and is awaiting approval.`,
      body: {
        safeTransactionHash: safeTxHash,
        signature: sig,
        symbol: 'ETH',
      },
    };
  } catch (error) {
    console.log('error:::', error);
    return {
      message: `Error transferring the asset: ${error}`,
    };
  }
}
