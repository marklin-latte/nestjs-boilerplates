export interface TransactionUnitOfWork {
  start(): Promise<void>;
  complete(): Promise<void>;
  registerEntity(entity);
  registerRepository(c): any;
}
