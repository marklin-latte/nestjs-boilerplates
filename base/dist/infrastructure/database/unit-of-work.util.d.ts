import { Logger } from '@nestjs/common';
import { Repository, EntitySchema, DataSource } from 'typeorm';
import { TransactionUnitOfWork } from './unit-of-work.interface';
export declare class UnitOfWorkUtil implements TransactionUnitOfWork {
    logger: Logger;
    private transactionQueryRunner;
    private dataSource;
    private originRepositories;
    constructor(dataSource: DataSource);
    start(): Promise<void>;
    registerEntity<Entity>(entity: EntitySchema<Entity>): Repository<Entity>;
    registerRepository(Class: any): any;
    complete(): Promise<void>;
}
