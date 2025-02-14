import { PrivyClient } from '@privy-io/server-auth';
import { NextResponse } from 'next/server';

export const POST = async () => {
  const {
    NEXT_PUBLIC_PRIVY_APP_ID,
    NEXT_PUBLIC_PRIVY_APP_SECRET,
    NEXT_PUBLIC_PRIVY_AUTHORIZATION_KEY,
  } = process.env;
  try {
    const privy = new PrivyClient(
      NEXT_PUBLIC_PRIVY_APP_ID as string,
      NEXT_PUBLIC_PRIVY_APP_SECRET as string,
      {
        walletApi: {
          authorizationPrivateKey: NEXT_PUBLIC_PRIVY_AUTHORIZATION_KEY as string,
        },
      },
    );

    const { id, address, chainType, authorizationThreshold } = await privy.walletApi.create({
      chainType: 'ethereum',
    });

    return NextResponse.json({ id, address, chainType, authorizationThreshold }, { status: 200 });
  } catch (error) {
    console.error('Error creating one server wallet', error);
    return NextResponse.json({ error: 'Failed to create server wallet' }, { status: 500 });
  }
};
