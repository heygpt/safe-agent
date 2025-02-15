import { Network } from 'alchemy-sdk';
import { Chain, createPublicClient, fallback, Hex, http } from 'viem';
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  mainnet,
  sepolia,
} from 'viem/chains';
import { getTokenInfo, maliciousCheck } from '../services/security-check';
import { Check } from '../services/security-check/types';

export const networkMappings: Record<number, Chain> = {
  [mainnet.id]: mainnet,
  [base.id]: base,
  [arbitrum.id]: arbitrum,
  [sepolia.id]: sepolia,
  [baseSepolia.id]: baseSepolia,
  [arbitrumSepolia.id]: arbitrumSepolia,
};

export const alchemyNetworkMappings: Record<number, Network> = {
  [mainnet.id]: Network.ETH_MAINNET,
  [base.id]: Network.BASE_MAINNET,
  [arbitrum.id]: Network.ARB_MAINNET,
  [sepolia.id]: Network.ETH_SEPOLIA,
  [baseSepolia.id]: Network.BASE_SEPOLIA,
};

export async function isContractAddress(address: Hex, chain: Chain) {
  try {
    const client = createPublicClient({
      chain,
      transport: fallback([http(process.env.RPC_URL || ''), http()]),
    });

    const bytecode = await client.getCode({ address });
    return bytecode !== undefined && bytecode !== '0x';
  } catch (error) {
    console.error('Error checking if address is a contract:', error);
    return false;
  }
}

export function isAddressMalicious(checkResult: Check) {
  return (
    +checkResult.result.sanctioned === 1 ||
    +checkResult.result.cybercrime === 1 ||
    +checkResult.result.fake_token === 1 ||
    +checkResult.result.honeypot_related_address === 1 ||
    +checkResult.result.financial_crime === 1
  );
}

export async function addressValidation(
  recipient: Hex,
  tokenAddress: Hex,
  chain: Chain
) {
  const checkResult = await maliciousCheck(recipient as Hex);
  if (
    +checkResult.result.sanctioned === 1 ||
    +checkResult.result.cybercrime === 1 ||
    +checkResult.result.fake_token === 1 ||
    +checkResult.result.honeypot_related_address === 1 ||
    +checkResult.result.financial_crime === 1
  ) {
    throw new Error(
      `Heads up! This recipient address has been marked as malicious. Avoid interactions to protect your assets. ${JSON.stringify(checkResult.result)}`
    );
  }

  if (!!tokenAddress && (await isContractAddress(tokenAddress as Hex, chain))) {
    const tokenInfo = await getTokenInfo(tokenAddress, chain.id);
    if (+tokenInfo.malicious_address === 1) {
      throw new Error(
        'Heads up! This token has been marked as malicious. Avoid interactions to protect your assets.'
      );
    }
  }
}
