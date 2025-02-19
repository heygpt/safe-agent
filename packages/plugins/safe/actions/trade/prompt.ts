export const TRADE_PROMPT = `This tool will trade a specified amount of a 'tokenIn' to a 'tokenOut' for the wallet.

It takes the following inputs:
- The amount of the 'tokenIn' to trade
- The tokenIn address to trade, if not provided, put it as ETH with 0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
- The tokenOut address to receive from the trade
`;

// Important notes:
// - Trades are only supported on mainnet networks (ie, 'base-mainnet', 'base', 'ethereum-mainnet', 'ethereum', etc.)
// - Never allow trades on any non-mainnet network (ie, 'base-sepolia', 'ethereum-sepolia', etc.)
// - When selling a native asset (e.g. 'eth' on base-mainnet), ensure there is sufficient balance to pay for the trade AND the gas cost of this trade
