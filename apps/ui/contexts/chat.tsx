'use client';

import { Message, useChat as useAiChat } from '@ai-sdk/react';
import { usePrivy, useWallets } from '@privy-io/react-auth';
import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useShallow } from 'zustand/react/shallow';
import Safe, { Eip1193Provider } from '@safe-global/protocol-kit';
import { v4 as uuidv4 } from 'uuid';
import { Hex, createPublicClient, createWalletClient, custom, fallback, http } from 'viem';
import { Button } from '@/components/ui';
import useBoundStore from '@/store';
import { ACTION_NAMES, DEFAULT_CHAIN } from '@/utils/constants';

type ToolResult<T> = {
  message: string;
  body?: T;
};

interface ChatContextType {
  messages: Message[];
  input: string;
  setInput: (input: string) => void;
  onSubmit: () => Promise<void>;
  isLoading: boolean;
  sendMessage: (message: string) => void;
  addToolResult: <T>(toolCallId: string, result: ToolResult<T>) => void;
  isResponseLoading: boolean;
  inputDisabledMessage: string;
}

const ChatContext = createContext<ChatContextType>({
  messages: [],
  input: '',
  setInput: () => {},
  onSubmit: async () => {},
  isLoading: false,
  sendMessage: () => {},
  isResponseLoading: false,
  addToolResult: () => {},
  inputDisabledMessage: '',
});

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [saltNonce] = useState(Math.trunc(Math.random() * 10 ** 10).toString());
  const [isResponseLoading, setIsResponseLoading] = useState(false);

  const { user, getAccessToken, ready, authenticated, logout } = usePrivy();
  const { wallets } = useWallets();
  const wallet = useMemo(() => wallets[0], [wallets]);

  const {
    serverWallet,
    setServerWallet,
    chatId,
    setChatId,
    showGlobalLoading,
    setGlobalLoading,
    safeWallet,
    setSafeWallet,
    resetAppData,
  } = useBoundStore(
    useShallow(state => ({
      serverWallet: state.serverWallet,
      setServerWallet: state.setServerWallet,
      chatId: state.chatId,
      setChatId: state.setChatId,
      showGlobalLoading: state.showGlobalLoading,
      setGlobalLoading: state.setGlobalLoading,
      safeWallet: state.safeWallet,
      setSafeWallet: state.setSafeWallet,
      resetAppData: state.resetAppData,
    })),
  );

  const createSafe = useCallback(async () => {
    if (!wallet) return;
    console.log('creating safe....');
    try {
      await wallet.switchChain(DEFAULT_CHAIN.id);
      const provider = await wallet.getEthereumProvider();
      const walletClient = createWalletClient({
        account: wallet.address as Hex,
        chain: DEFAULT_CHAIN,
        transport: custom(provider),
      });

      // let sw: ServerWallet | null = serverWallet;
      // if (!sw) {
      //   const res = await fetch('/api/privy', {
      //     method: 'POST',
      //   });
      //   if (!res.ok) {
      //     throw new Error(`Privy API error: ${res.status}`);
      //   }
      //   sw = await res.json();
      //   setServerWallet(sw);
      // }
      // if (!sw) {
      //   throw new Error('Server wallet not found');
      // }
      const safekit = await Safe.init({
        provider: walletClient as Eip1193Provider,
        signer: wallet.address,
        predictedSafe: {
          safeAccountConfig: {
            owners: [wallet.address, '0xc594eE276A8f58bCE8EA1D9cfA8c4e02e4ba62A8'],
            threshold: 2,
          },
          safeDeploymentConfig: {
            saltNonce,
          },
        },
      });

      const safeAddress = await safekit.getAddress();
      if (await safekit.isSafeDeployed()) {
        setSafeWallet(safeAddress as Hex);
        return;
      }

      const deploymentTransaction = await safekit.createSafeDeploymentTransaction();
      const safeClient = await safekit.getSafeProvider().getExternalSigner();

      const transactionHash = await safeClient?.sendTransaction({
        to: deploymentTransaction.to,
        value: BigInt(deploymentTransaction.value),
        data: deploymentTransaction.data as Hex,
        chain: DEFAULT_CHAIN,
      });

      const publicClient = createPublicClient({
        chain: DEFAULT_CHAIN,
        transport: fallback([http()]),
      });
      const receipt = await publicClient?.waitForTransactionReceipt({
        hash: transactionHash as Hex,
      });

      if (receipt?.status === 'success') {
        setSafeWallet(safeAddress as Hex);
        console.log(
          `A new Safe multisig was successfully deployed on Sepolia. You can see it live at https://app.safe.global/home?safe=sep:${safeAddress}. The saltNonce used was ${saltNonce}.`,
        );
      }
    } catch (err) {
      console.error('Error creating safe:', err);
      // if (err instanceof Error && err.message.includes('User rejected')) {
      //   console.log('User denied transaction signature');
      //   // setTimeout(() => {
      //   //   createSafe();
      //   // }, 3000);
      // } else {
      //   resetAppData();
      //   await logout();
      // }
    }
  }, [wallet, serverWallet, saltNonce, setServerWallet, setSafeWallet]);

  useEffect(() => {
    if (!safeWallet) {
      createSafe();
    }
  }, [createSafe, safeWallet]);

  const {
    messages,
    input,
    setInput,
    append,
    isLoading,
    addToolResult: addToolResultBase,
    setMessages,
  } = useAiChat({
    maxSteps: 20,
    onResponse: () => {
      setIsResponseLoading(false);
    },
    api: '/api/agent',
    body: {
      userId: user,
      chatId,
      safeWallet,
      walletId: serverWallet?.id,
    },
  });

  useEffect(() => {
    const fetchChat = async () => {
      if (!chatId) return;

      try {
        const chat = await fetch(`/api/chats/${chatId}`, {
          headers: {
            Authorization: `Bearer ${await getAccessToken()}`,
          },
        });
        const chatData = await chat.json();
        if (chatData && chatData.data) {
          setMessages(chatData.data.messages);
        }
      } catch (error) {
        console.error('Error fetching chat:', error);
      } finally {
        setGlobalLoading(false);
      }
    };

    if (user) {
      setChatId(!chatId ? uuidv4() : chatId);
      setGlobalLoading(true);
      fetchChat();
    }
  }, [user, chatId, setChatId, setGlobalLoading, setMessages, getAccessToken]);

  const addToolResult = <T,>(toolCallId: string, result: ToolResult<T>) => {
    addToolResultBase({
      toolCallId,
      result,
    });
  };

  useEffect(() => {
    const updateChat = async () => {
      if (messages.length > 0 && !isLoading) {
        try {
          const response = await fetch(`/api/chats/${chatId}`, {
            method: 'POST',
            body: JSON.stringify({
              messages,
            }),
          });
          await response.json();
        } catch (error) {
          console.error('Error updating chat:', error);
        }
      }
    };

    updateChat();
  }, [isLoading]);

  const onSubmit = async () => {
    if (!input.trim()) return;
    setIsResponseLoading(true);
    await append({
      role: 'user',
      content: input,
    });
    setInput('');
  };

  const sendMessage = async (message: string) => {
    setIsResponseLoading(true);
    await append({
      role: 'user',
      content: message,
    });
  };

  const inputDisabledMessage = useMemo(() => {
    if (messages.length === 0) return '';

    const lastMessage = messages[messages.length - 1];
    let message = lastMessage.toolInvocations
      ?.map(toolInvocation => {
        if (toolInvocation.state === 'result') return '';
        const toolName = toolInvocation.toolName.slice(toolInvocation.toolName.indexOf('-') + 1);
        switch (toolName) {
          case ACTION_NAMES.TRADE_NAME:
            return `Complete or cancel your trade`;
          case ACTION_NAMES.TRANSFER_NAME:
            return `Complete or cancel your payment`;
          case ACTION_NAMES.STAKE_NAME:
            return `Complete or cancel your stake`;
          case ACTION_NAMES.UNSTAKE_NAME:
            return `Complete or cancel your unstake`;
          case ACTION_NAMES.GET_WALLET_ADDRESS_NAME:
            return `Connect your wallet`;
          default:
            return '';
        }
      })
      .filter(message => message !== '')
      .join(' and ');

    if (message) {
      message = message?.concat(' to continue');
    }
    return message || '';
  }, [messages]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        input,
        setInput,
        onSubmit,
        isLoading: isLoading || showGlobalLoading || !ready || !user || !authenticated,
        sendMessage,
        isResponseLoading,
        addToolResult,
        inputDisabledMessage: showGlobalLoading
          ? 'Loading your chat history...'
          : !authenticated || !ready
            ? 'Please login to continue'
            : inputDisabledMessage,
      }}
    >
      <Button
        onClick={() => {
          logout();
        }}
      >
        Logout
      </Button>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
