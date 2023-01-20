import { ImageEntity } from '../../src/domain/user/entity/image.entity';
import { PermissionEntity } from '../../src/domain/user/entity/permission.entity';
import { UserEntity } from '../../src/domain/user/entity/user.entity';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { appConfig } from '../../src/config/application.config';

export { config, DataSourceKey };

enum DataSourceKey {
  'public' = 'public',
}

type TestOrmConfig = {
  public: PostgresConnectionOptions;
};

const config = {
  public: {
    ...appConfig.db,
    type: 'postgres',
    schema: 'public',
    database: 'test',
    entities: [
      // join(__dirname, '../../dist/modules/domain/**/entity/*.entity.js'),
      'src/domain/**/*.entity.ts',
    ],
    synchronize: false,
  } as PostgresConnectionOptions,
} as TestOrmConfig;
