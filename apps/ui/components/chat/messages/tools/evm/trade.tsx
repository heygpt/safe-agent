import { FC } from 'react';
import { TradeActionResultType } from '@safe-agent/safe';
import type { ToolInvocation } from 'ai';
import ToolCard from '../tool-card';
import Swap from './swap';

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const Trade: FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Swapping...`}
      result={{
        heading: (result: TradeActionResultType) =>
          result.body ? `Proposed swap` : `Failed to propose swap`,
        body: (result: TradeActionResultType) =>
          result.body ? (
            <Swap body={result.body} message={result.message} />
          ) : (
            'No token address found'
          ),
      }}
      prevToolAgent={prevToolAgent}
      defaultOpen={false}
    />
  );
};

export default Trade;
