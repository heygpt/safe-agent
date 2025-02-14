'use client';

import { PrivyProvider } from '@privy-io/react-auth';
import { ReactNode } from 'react';
import { ChatProvider } from '@/contexts/chat';

const OnchainProviders = ({ children }: { children: ReactNode }) => {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          logo: 'https://raw.githubusercontent.com/heygpt/safe-agent/refs/heads/main/apps/ui/public/logo.png',
        },
        embeddedWallets: {
          createOnLogin: 'all-users',
        },
      }}
    >
      <ChatProvider>{children}</ChatProvider>
    </PrivyProvider>
  );
};

export default OnchainProviders;
