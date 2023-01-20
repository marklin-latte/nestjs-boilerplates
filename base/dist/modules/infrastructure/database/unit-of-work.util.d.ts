import { Logger } from '@nestjs/common';
import { Repository, EntitySchema, DataSource } from 'typeorm';
import { TransactionUnitOfWork } from './unit-of-work.interface';
export declare class UnitOfWorkUtil implements TransactionUnitOfWork {
    logger: Logger;
    private globalQueryRunner;
    private transactionQueryRunner;
    private dataSource;
    private originRepositories;
    constructor(dataSource: DataSource);
    start(): Promise<void>;
    registerRepository<Entity>(entity: EntitySchema<Entity>): Repository<Entity>;
    complete(): Promise<void>;
}
