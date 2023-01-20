import { PubSubService } from '../../infrastructure/pubsub/supplement/pubsub.interface';
import { Logger } from '@nestjs/common';
import { TransactionUnitOfWork } from '../../infrastructure/database/unit-of-work.interface';
export declare class BaseUseCase {
    logger: Logger;
    protected readonly unitOfWork: TransactionUnitOfWork;
    private readonly pubsubService;
    constructor(unitOfWork: TransactionUnitOfWork, pubsubService: PubSubService);
    publishDomainEvent(domainEvent: string, message: any): Promise<void>;
}
