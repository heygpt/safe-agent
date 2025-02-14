import { EnsoClient } from '@ensofinance/sdk';

export const ensoClient = new EnsoClient({
  apiKey: process.env.ENSO_API_KEY as string,
});
