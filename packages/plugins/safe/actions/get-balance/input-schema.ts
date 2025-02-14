import { z } from 'zod';

export const GetBalanceInputSchema = z
  .object({})
  .strip()
  .describe('Instructions for getting wallet ETH balance');
