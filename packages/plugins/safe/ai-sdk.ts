import { Tool, tool } from 'ai';

import { SafeWalletkit } from './safe-walletkit';

import { getAllSafeActions } from './actions';

import { z } from 'zod';
import type {
  InvokeAction,
  InvokeActionResult,
  InvokeActionSchemaAny,
  SafeAction,
  SafeActionSchemaAny,
} from './actions';

export const safeTool = <
  TActionSchema extends SafeActionSchemaAny,
  TResultBody,
>(
  action: SafeAction<TActionSchema, TResultBody>,
  walletkit: SafeWalletkit
) => {
  if (!action.func) {
    return tool({
      description: action.description,
      parameters: action.argsSchema,
    });
  }
  return tool({
    description: action.description,
    parameters: action.argsSchema,
    execute: async (args) => {
      const result = await walletkit.run(action, args);
      return result;
    },
  });
};

export const safeTools = (walletkit: SafeWalletkit) =>
  getAllSafeActions().reduce(
    (acc, action) => {
      acc[action.name] = safeTool(action, walletkit);
      return acc;
    },
    {} as Record<string, Tool>
  );

export const invokeTool = <
  TActionSchema extends InvokeActionSchemaAny,
  TResultBody,
>(
  action: InvokeAction<TActionSchema, TResultBody>
) => {
  if (!action.func) {
    return tool({
      description: action.description,
      parameters: action.argsSchema,
    });
  }
  const func = action.func;
  return tool({
    description: action.description,
    parameters: action.argsSchema,
    execute: async (args) => {
      const result = await (
        func as (
          args: z.infer<TActionSchema>
        ) => Promise<InvokeActionResult<TResultBody>>
      )(args);
      return result;
    },
  });
};

// export const invokeTools = () =>
//   INVOKE_ACTIONS.reduce(
//     (acc, action) => {
//       acc[action.name] = invokeTool(action);
//       return acc;
//     },
//     {} as Record<string, Tool>
//   );
