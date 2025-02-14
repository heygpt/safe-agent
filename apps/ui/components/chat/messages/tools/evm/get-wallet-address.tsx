import { usePrivy } from '@privy-io/react-auth';
import React, { useEffect } from 'react';
import type { GetWalletDetailsActionResultType } from '@safe-agent/safe';
import type { ToolInvocation } from 'ai';
import LoginButton from '@/components/ui/login-button';
import { useChat } from '@/contexts/chat';
import ToolCard from '../tool-card';

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const GetWalletAddress: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting Wallet Address...`}
      result={{
        heading: (result: GetWalletDetailsActionResultType) =>
          result.body ? `Fetched Wallet Address` : 'No wallet address found',
        body: (result: GetWalletDetailsActionResultType) =>
          result.body
            ? `Owners of the Safe wallet ${result.body.address} are ${result.body.owners.join(', ')}.\n\nThe threshold is ${result.body.threshold}.`
            : 'No wallet address found',
      }}
      call={{
        heading: 'Connect Wallet',
        body: (toolCallId: string) => <GetWalletAddressAction toolCallId={toolCallId} />,
      }}
      prevToolAgent={prevToolAgent}
    />
  );
};

const GetWalletAddressAction = ({ toolCallId }: { toolCallId: string }) => {
  const { user } = usePrivy();

  const { addToolResult, isLoading } = useChat();

  useEffect(() => {
    if (user?.wallet?.address && !isLoading) {
      addToolResult(toolCallId, {
        message: 'Wallet connected',
        body: {
          address: user.wallet.address,
        },
      });
    }
  }, [user, isLoading]);

  return (
    <div className="flex flex-col items-center gap-2">
      <LoginButton />
    </div>
  );
};

export default GetWalletAddress;
