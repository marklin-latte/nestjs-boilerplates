import { Logger } from '@nestjs/common';
import { QueryRunner, Repository, EntitySchema, DataSource } from 'typeorm';
import { TransactionUnitOfWork } from './unit-of-work.interface';

export class UnitOfWorkUtil implements TransactionUnitOfWork {
  logger: Logger = new Logger(UnitOfWorkUtil.name);

  private transactionQueryRunner: QueryRunner;
  private dataSource: DataSource;
  private originRepositories: Repository<any>[] = [];

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async start(): Promise<void> {
    this.transactionQueryRunner = this.dataSource.createQueryRunner();
    this.originRepositories.forEach((repository) => {
      this.transactionQueryRunner.manager.withRepository(repository);
    });

    await this.transactionQueryRunner.startTransaction();
  }

  registerEntity<Entity>(entity: EntitySchema<Entity>): Repository<Entity> {
    const result = this.dataSource.getRepository(entity);
    this.originRepositories.push(result);
    return result;
  }

  registerRepository(Class: any) {
    return new Class(this);
  }

  async complete(): Promise<void> {
    try {
      await this.transactionQueryRunner.commitTransaction();
    } catch (error) {
      await this.transactionQueryRunner.rollbackTransaction();
      this.logger.error(error);
      throw error;
    } finally {
      this.originRepositories.forEach((repository) => {
        this.dataSource.manager.withRepository(repository);
      });
      await this.transactionQueryRunner.release();
    }
  }
}
