// eslint-disable-next-line @typescript-eslint/no-var-requires
require('ts-node').register({ transpileOnly: true });

import { DataSource } from 'typeorm';
import { config as testOrmConfig } from './test-orm-config';

export default async (globalConfig, projectConfig) => {
  await syncTables();
};

async function syncTables() {
  const publicConnection = new DataSource(testOrmConfig.public);
  try {
    await publicConnection.initialize();
    await publicConnection.synchronize();
  } catch (error) {
    throw error;
  } finally {
    await publicConnection.destroy();
  }
}
