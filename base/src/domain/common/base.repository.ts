import { TransactionUnitOfWork } from '../../infrastructure/database/unit-of-work.interface';

export class BaseRepository {
  protected readonly unitOfWork: TransactionUnitOfWork;

  constructor(unitOfWork: TransactionUnitOfWork) {
    this.unitOfWork = unitOfWork;
  }
}
