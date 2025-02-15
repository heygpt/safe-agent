'use client';

import React from 'react';
import Logo from '@/components/ui/logo';
import { cn } from '@/utils/cn';

const EmptyChat: React.FC = () => {
  return (
    <div className={cn('flex h-[80%] w-full flex-col items-center justify-center px-4')}>
      <div className="flex w-full max-w-2xl flex-col items-center justify-center gap-4 md:gap-8">
        <div className="flex flex-col items-center justify-center gap-4">
          <Logo className="h-20 w-20" />
          <div className="flex flex-col gap-1">
            <h1 className="text-center text-2xl font-semibold">How can I help you today?</h1>
            <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
              Your <span className="inline font-bold text-brand-600">Safe Copilot</span> in Web3 –
              Transact with <span className="inline font-bold text-brand-600">Confidence</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyChat;
