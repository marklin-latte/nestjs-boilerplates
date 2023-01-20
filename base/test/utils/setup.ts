// eslint-disable-next-line @typescript-eslint/no-var-requires
require('ts-node').register({ transpileOnly: true });

import { AppModule } from '../../src/app.module';
import { DataSource } from 'typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { config as testOrmConfig, DataSourceKey } from './test-orm-config';
import { ProviderTokens as PubSubProviderTokens } from '../../src/infrastructure/pubsub/pubsub.provider';
import { ProviderTokens as DatabaseProviderTokens } from '../../src/infrastructure/database/database.provider';
import { UnitOfWorkUtil } from '../../src/infrastructure/database/unit-of-work.util';

const connectionMap: Map<string, DataSource> = new Map();
let app: INestApplication;

export type TestAppContainer = {
  app: INestApplication;
  publicConnection: DataSource;
  serviceToken: string;
};

export default class TestContainer {
  static async start(): Promise<TestAppContainer> {
    const publicConnection = await getConnection(DataSourceKey.public);
    const unitOfWork = new UnitOfWorkUtil(publicConnection);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DatabaseProviderTokens.UNIT_OF_WORK)
      .useValue(unitOfWork)
      .overrideProvider(PubSubProviderTokens.PUBSUB_SERVICE)
      .useValue({
        publish: jest.fn(),
      })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
      }),
    );
    await app.init();

    return {
      app,
      serviceToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXJ2aWNlIjoiMkMiLCJjcmVhdGVkQXQiOjE2NjU0MTc0NjAyMDgsImlhdCI6MTY2NTQxNzQ2MH0.AOvwgvhOClQag0FgX6avqu5y7SYV5yCQhN4Ay6WY2d0',
      publicConnection,
    } as TestAppContainer;
  }

  static async stop(): Promise<any> {
    const publicConnection = connectionMap.get(DataSourceKey.public);
    await publicConnection.destroy();

    await app.close();
  }
}

async function getConnection(key: DataSourceKey) {
  if (connectionMap.has(key)) {
    return connectionMap.get(key);
  }

  const connection = new DataSource(testOrmConfig[key]);
  await connection.initialize();
  connectionMap.set(key, connection);

  return connection;
}
