import { Hex } from 'viem';
import { querySecurityChecks } from './base';
import { Check } from './types';

export const maliciousCheck = async (address: Hex): Promise<Check> => {
  return querySecurityChecks<Check>(`/v1/address_security/${address}`);
};
