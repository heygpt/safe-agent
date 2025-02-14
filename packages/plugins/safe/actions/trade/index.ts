import { trade } from './function';
import { TradeInputSchema } from './input-schema';
import { TRADE_NAME } from './name';
import { TRADE_PROMPT } from './prompt';

import type { SafeAction } from '../types';
import type { TradeResultBodyType, TradeSchemaType } from './types';

export class TradeAction
  implements SafeAction<TradeSchemaType, TradeResultBodyType>
{
  public name = TRADE_NAME;
  public description = TRADE_PROMPT;
  public argsSchema = TradeInputSchema;
  public func = trade;
}
