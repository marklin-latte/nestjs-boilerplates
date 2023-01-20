export interface TransactionUnitOfWork {
    start(): Promise<void>;
    complete(): Promise<void>;
    registerRepository(entity: any): any;
}
