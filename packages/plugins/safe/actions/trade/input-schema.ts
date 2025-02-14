import { z } from 'zod';

export const TradeInputSchema = z
  .object({
    recipient: z.string().optional().describe('The recipient of the trade'),
    amountIn: z.number().describe('The amount of the tokenIn to trade'),
    tokenIn: z
      .string()
      .regex(
        /^0x[a-fA-F0-9]{40}$/,
        'Must be a valid Ethereum contract address (0x followed by 40 hexadecimal characters)'
      )
      .describe('The token in to trade'),
    tokenOut: z
      .string()
      .regex(
        /^0x[a-fA-F0-9]{40}$/,
        'Must be a valid Ethereum contract address (0x followed by 40 hexadecimal characters)'
      )
      .describe('The token out to receive from the trade'),
  })
  .strip()
  .describe('Instructions for trading assets');
