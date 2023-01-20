import { Logger } from '@nestjs/common';
import { AdminCreateUserInputDto } from '../dto/admin-create-user-input.dto';
import { BaseUseCase } from '../../common/base.usecase';
import { User } from '../domainModel/user.dm';
import { PubSubService } from '../../../infrastructure/pubsub/supplement/pubsub.interface';
import { TransactionUnitOfWork } from '../../../infrastructure/database/unit-of-work.interface';
export declare class AdminUserUseCase extends BaseUseCase {
    logger: Logger;
    private readonly userRepository;
    constructor(pubsubService: PubSubService, unitOfWork: TransactionUnitOfWork);
    createUser(adminCreateUserInputDto: AdminCreateUserInputDto): Promise<User>;
    findUserById(userId: string): Promise<User>;
}
