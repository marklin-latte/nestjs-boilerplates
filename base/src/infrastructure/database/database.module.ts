import { Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request as ExpressRequest } from 'express';
import { DataSource } from 'typeorm';

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { TransactionUnitOfWork } from '../database/unit-of-work.interface';
import { UnitOfWorkUtil } from '../database/unit-of-work.util';
import { ProviderTokens } from './database.provider';
import { appConfig } from '../../config/application.config';

const unitOfWorkFactory = {
  provide: ProviderTokens.UNIT_OF_WORK,
  scope: Scope.REQUEST,
  useFactory: async (
    request: ExpressRequest,
  ): Promise<TransactionUnitOfWork> => {
    const { tenantId } = request;
    if (!tenantId) return null;

    const connection = new DataSource(
      appConfig.db as PostgresConnectionOptions,
    );
    connection.initialize();
    const unitOfWork = new UnitOfWorkUtil(connection);

    return unitOfWork;
  },
  inject: [REQUEST],
};

@Global()
@Module({
  providers: [unitOfWorkFactory],
  exports: [ProviderTokens.UNIT_OF_WORK],
})
export class DatabaseModule {}
