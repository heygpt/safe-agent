export const TRANSFER_PROMPT = `
This tool will transfer ETH from the wallet to another onchain address.

It takes the following inputs:
- amount: The amount to transfer
- recipient: Where to send the funds (can be an onchain address, ENS 'example.eth')

Important notes:
- Ensure sufficient balance of the input asset before transferring
- When sending native assets (e.g. 'eth' on arbitrum-mainnet, or 'avax' on avalanche-mainnet), ensure there is sufficient balance for the transfer itself AND the gas cost of this transfer
`;
