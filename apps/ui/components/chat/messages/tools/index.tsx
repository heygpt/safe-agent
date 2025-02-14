'use client';

import React from 'react';
import {
  GET_BALANCE_NAME,
  GET_TOKEN_ADDRESS_NAME,
  GET_TOKEN_DATA_NAME,
  GET_WALLET_DETAILS_NAME,
  TRANSFER_NAME,
} from '@safe-agent/safe';
import type { ToolInvocation as ToolInvocationType } from 'ai';
import { Balance, GetTokenAddress, GetTokenData } from './evm';
import GetWalletAddress from './evm/get-wallet-address';
import Transfer from './evm/transfer';

interface Props {
  tool: ToolInvocationType;
  prevToolAgent?: string;
}

const ToolInvocation: React.FC<Props> = ({ tool, prevToolAgent }) => {
  switch (tool.toolName) {
    case GET_BALANCE_NAME:
      return <Balance tool={tool} prevToolAgent={prevToolAgent} />;
    case GET_WALLET_DETAILS_NAME:
      return <GetWalletAddress tool={tool} prevToolAgent={prevToolAgent} />;
    case GET_TOKEN_DATA_NAME:
      return <GetTokenData tool={tool} prevToolAgent={prevToolAgent} />;
    case GET_TOKEN_ADDRESS_NAME:
      return <GetTokenAddress tool={tool} prevToolAgent={prevToolAgent} />;
    case TRANSFER_NAME:
      return <Transfer tool={tool} prevToolAgent={prevToolAgent} />;
    default:
      return <pre className="whitespace-pre-wrap">{JSON.stringify(tool, null, 2)}</pre>;
  }
};

export default ToolInvocation;
