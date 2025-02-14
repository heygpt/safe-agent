import { EnsoClient } from '@ensofinance/sdk';

export const ensoClient = new EnsoClient({
  apiKey: process.env.ENSO_API_KEY || '1e02632d-6feb-4a75-a157-documentation',
});
