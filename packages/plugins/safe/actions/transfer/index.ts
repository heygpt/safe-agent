import { transfer } from './function';
import { TransferInput } from './input-schema';
import { TRANSFER_NAME } from './name';
import { TRANSFER_PROMPT } from './prompt';

import { SafeAction } from '../types';
import type { TransferResultBodyType, TransferSchemaType } from './types';

export class TransferAction
  implements SafeAction<TransferSchemaType, TransferResultBodyType>
{
  public name = TRANSFER_NAME;
  public description = TRANSFER_PROMPT;
  public argsSchema = TransferInput;
  public func = transfer;
}
