'use client';

import { useLogin, usePrivy } from '@privy-io/react-auth';
import React from 'react';
import { Button } from '@/components/ui';

export const LoginButton: React.FC = () => {
  const { authenticated } = usePrivy();

  const { login } = useLogin();

  return (
    <Button variant={'brand'} onClick={() => login()} disabled={authenticated}>
      Log in
    </Button>
  );
};

export default LoginButton;
