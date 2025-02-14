import { z } from 'zod';

export const TransferInput = z
  .object({
    amount: z.number().describe('The amount of the asset to transfer'),
    assetAddress: z
      .string()
      .optional()
      .describe('The asset/token address to transfer'),
    recipient: z
      .string()
      .describe('The recipient address to transfer the funds'),
  })
  .strip()
  .describe('Instructions for transferring ETH');
