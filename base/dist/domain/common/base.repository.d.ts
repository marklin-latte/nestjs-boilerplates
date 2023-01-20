import { TransactionUnitOfWork } from '../../infrastructure/database/unit-of-work.interface';
export declare class BaseRepository {
    protected readonly unitOfWork: TransactionUnitOfWork;
    constructor(unitOfWork: TransactionUnitOfWork);
}
