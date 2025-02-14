'use client';

import { usePrivy } from '@privy-io/react-auth';
import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  LoginButton,
  Logo,
} from '@/components/ui';

const NotLoggedInAlert: React.FC = () => {
  const { ready, user } = usePrivy();

  return (
    <AlertDialog open={ready && !user}>
      <AlertDialogHeader className="hidden">
        <AlertDialogTitle>You are not logged in</AlertDialogTitle>
        <AlertDialogDescription>Please login to continue</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogContent className="flex flex-col items-center justify-center">
        <Logo className="h-16 w-16" />
        <h1 className="text-2xl font-bold">You are not logged in</h1>
        <p className="text-sm text-gray-500">Please login to continue</p>
        <LoginButton />
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default NotLoggedInAlert;
