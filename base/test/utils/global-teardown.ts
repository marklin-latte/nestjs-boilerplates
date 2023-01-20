import { DataSource } from 'typeorm';
import { config as testOrmConfig } from './test-orm-config';

export default async (globalConfig, projectConfig) => {
  await deleteTestDatabase();
};

async function deleteTestDatabase() {
  const connection = new DataSource({
    type: testOrmConfig.public.type,
    username: testOrmConfig.public.username,
    password: testOrmConfig.public.password,
  });
  await connection.initialize();
  await connection
    .createQueryRunner()
    .dropDatabase(testOrmConfig.public.database);
  await connection.destroy();
}
