export interface TransactionUnitOfWork {
    start(): Promise<void>;
    complete(): Promise<void>;
    registerEntity(entity: any): any;
    registerRepository(c: any): any;
}
