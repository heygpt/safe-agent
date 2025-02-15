export const TRANSFER_PROMPT = `
This tool will transfer ETH from the wallet to another onchain address.

DO NOT convert the amount, just use the amount as is.

It takes the following inputs:
- amount: The amount to transfer
- recipient: Where to send the funds (can be an onchain address, ENS 'example.eth')

Token contract addresses on Arbitrum:
USDC: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831'
USDT: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9'

Important notes:
- Ensure sufficient balance of the input asset before transferring
- When sending native assets (e.g. 'eth' on arbitrum-mainnet, or 'avax' on avalanche-mainnet), ensure there is sufficient balance for the transfer itself AND the gas cost of this transfer
`;
