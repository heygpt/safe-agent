import { FC } from 'react';
import { TransferActionResultType } from '@safe-agent/safe';
import type { ToolInvocation } from 'ai';
import ToolCard from '../tool-card';
import SignData from './sign-data';

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const Transfer: FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Transferring...`}
      result={{
        heading: (result: TransferActionResultType) =>
          result.body ? `Proposed Transfer` : `Failed to propose transfer`,
        body: (result: TransferActionResultType) =>
          result.body ? (
            <SignData body={result.body} message={result.message} />
          ) : (
            'No token address found'
          ),
      }}
      prevToolAgent={prevToolAgent}
      defaultOpen={false}
    />
  );
};

export default Transfer;
