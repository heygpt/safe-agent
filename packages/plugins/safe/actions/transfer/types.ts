import { z } from 'zod';

import { SafeSignature } from '@safe-global/types-kit';
import type { SafeActionResult } from '../types';
import type { TransferInput } from './input-schema';

export type TransferSchemaType = typeof TransferInput;

export type TransferArgumentsType = z.infer<TransferSchemaType>;

export type TransferResultBodyType = {
  transactionHash: string;
  symbol: string;
  signature?: SafeSignature;
};

export type TransferActionResultType = SafeActionResult<TransferResultBodyType>;
