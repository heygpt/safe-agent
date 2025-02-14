import { z } from 'zod';

import { InvokeAgentInputSchema } from './input-schema';

import type { InvokeActionResult } from '../types';

export type InvokeAgentSchemaType = ReturnType<typeof InvokeAgentInputSchema>;

export type InvokeAgentArgumentsType = z.infer<InvokeAgentSchemaType>;

export type InvokeAgentResultBodyType = {
  message: string;
};

export type InvokeAgentResultType =
  InvokeActionResult<InvokeAgentResultBodyType>;
