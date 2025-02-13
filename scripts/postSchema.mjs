import { SecretVaultWrapper } from 'nillion-sv-wrappers';
import conversationSchema from './conversation-schema.json' with { type: 'json' };
import { orgConfig } from './nillionOrgConfig.js';

async function main() {
  try {
    const org = new SecretVaultWrapper(
      orgConfig.nodes,
      orgConfig.orgCredentials
    );
    await org.init();

    // Create a new collection schema for all nodes in the org
    const collectionName = 'Safe Agent Conversation';
    const newSchema = await org.createSchema(conversationSchema, collectionName);
    console.log('✅ New Collection Schema created for all nodes:', newSchema);
    console.log('👀 Schema ID:', newSchema[0].result.data);
  } catch (error) {
    console.error('❌ Failed to use SecretVaultWrapper:', error.message);
    process.exit(1);
  }
}

main();
