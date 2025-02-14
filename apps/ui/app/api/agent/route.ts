import { azure } from '@ai-sdk/azure';
import { SafeWalletkit, safeTools } from '@safe-agent/safe';
import Safe from '@safe-global/protocol-kit';
import { streamText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { DEFAULT_CHAIN } from '@/utils/constants';

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { messages, safeWallet } = body;

  if (!safeWallet) {
    return NextResponse.json({ error: 'Missing safe address' }, { status: 500 });
  }

  try {
    const { PRIVATE_KEY, RPC_URL } = process.env;

    const existingSafe = await Safe.init({
      provider: RPC_URL ?? DEFAULT_CHAIN.rpcUrls.default.http[0],
      signer: PRIVATE_KEY,
      safeAddress: safeWallet,
    });

    if (!existingSafe) {
      return NextResponse.json({ error: 'Safe not found' }, { status: 500 });
    }

    const agentkit = await SafeWalletkit.configureWithWallet({
      wallet: existingSafe,
      chain: DEFAULT_CHAIN,
    });

    const result = streamText({
      model: azure('gpt-4o-mini'),
      tools: safeTools(agentkit),
      messages,
      maxSteps: 10,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
};
