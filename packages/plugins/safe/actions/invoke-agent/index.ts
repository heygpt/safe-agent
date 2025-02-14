import { invokeAgentFunction } from './function';
import { InvokeAgentInputSchema } from './input-schema';
import { INVOKE_AGENT_NAME } from './name';
import { INVOKE_AGENT_PROMPT } from './prompt';
import { InvokeAgentResultBodyType, InvokeAgentSchemaType } from './types';

import { Agent } from '../../agent';
import { InvokeAction } from '../types';

export class InvokeAgentAction
  implements InvokeAction<InvokeAgentSchemaType, InvokeAgentResultBodyType>
{
  public name = INVOKE_AGENT_NAME;
  public description: string;
  public argsSchema: InvokeAgentSchemaType;
  public func = invokeAgentFunction;

  constructor(agents: Agent[]) {
    this.argsSchema = InvokeAgentInputSchema(agents);
    this.description = INVOKE_AGENT_PROMPT(agents);
  }
}
