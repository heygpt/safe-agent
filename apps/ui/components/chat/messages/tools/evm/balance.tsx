import React from 'react';
import { GetBalanceActionResultType } from '@safe-agent/safe';
import type { ToolInvocation } from 'ai';
import TokenBalance from '@/components/TokenBalance';
import ToolCard from '../tool-card';

interface Props {
  tool: ToolInvocation;
  prevToolAgent?: string;
}

const GetBalance: React.FC<Props> = ({ tool, prevToolAgent }) => {
  return (
    <ToolCard
      tool={tool}
      loadingText={`Getting ${tool.args.tokenAddress || 'ETH'} Balance...`}
      result={{
        heading: (result: GetBalanceActionResultType) =>
          typeof result.body?.ethBalance !== undefined ||
          (!!result.body?.tokenBalances?.length && result.body?.tokenBalances?.length > 0)
            ? `Fetched balances`
            : `Failed to fetch balance`,
        body: (result: GetBalanceActionResultType) =>
          typeof result.body?.ethBalance !== undefined ||
          (!!result.body?.tokenBalances?.length && result.body?.tokenBalances?.length > 0) ? (
            <TokenBalance
              token={'ETH'}
              balance={result.body?.ethBalance ?? 0}
              logoURI={''}
              name={'ETH'}
            />
          ) : (
            'No balance found'
          ),
      }}
      prevToolAgent={prevToolAgent}
    />
  );
};

export default GetBalance;
