import { useWallets } from '@privy-io/react-auth';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { TransferActionResultType } from '@safe-agent/safe';
import SafeApiKit from '@safe-global/api-kit';
import Safe, { Eip1193Provider } from '@safe-global/protocol-kit';
import { Hex, createWalletClient, custom } from 'viem';
import { Card } from '@/components/ui';
import useBoundStore from '@/store';
import { DEFAULT_CHAIN } from '@/utils/constants';

const SignData: React.FC<TransferActionResultType> = ({ body }) => {
  const { wallets } = useWallets();
  const wallet = useMemo(() => wallets[0], [wallets]);
  const safeAddress = useBoundStore(useShallow(state => state.safeWallet));

  const [showText, setShowText] = useState(
    `Transfer ${body?.symbol} has been proposed, Safe Transaction Hash: ${body?.safeTransactionHash}`,
  );

  const confirmTransaction = useCallback(async () => {
    if (!body?.safeTransactionHash) return;
    await wallet.switchChain(DEFAULT_CHAIN.id);
    const provider = await wallet.getEthereumProvider();
    const walletClient = createWalletClient({
      account: wallet.address as Hex,
      chain: DEFAULT_CHAIN,
      transport: custom(provider),
    });

    const apiKit = new SafeApiKit({
      chainId: BigInt(DEFAULT_CHAIN.id),
    });

    const safeTxHash = body?.safeTransactionHash;
    const transaction = await apiKit.getTransaction(safeTxHash);
    if (transaction.isExecuted) return;

    const safekit = await Safe.init({
      provider: walletClient as Eip1193Provider,
      signer: wallet.address,
      safeAddress: safeAddress as Hex,
    });
    const signature = await safekit.signHash(safeTxHash);

    // Confirm the Safe transaction
    await apiKit.confirmTransaction(safeTxHash, signature.data);

    const tx = await safekit.executeTransaction(transaction);
    setShowText(`Transfer ${body?.symbol} has been executed, Transaction Hash: ${tx.hash}`);
  }, [body?.symbol, body?.safeTransactionHash, safeAddress, wallet]);

  useEffect(() => {
    confirmTransaction();
  }, [confirmTransaction]);

  return (
    <Card className="flex flex-row items-center gap-2 p-2">
      <div className="flex flex-col">
        <p className="text-xs text-neutral-600 dark:text-neutral-400">{showText})</p>
      </div>
    </Card>
  );
};

export default SignData;
