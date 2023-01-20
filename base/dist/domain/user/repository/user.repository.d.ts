import { Logger } from '@nestjs/common';
import { User } from '../domainModel/user.dm';
import { TransactionUnitOfWork } from '../../../infrastructure/database/unit-of-work.interface';
import { BaseRepository } from '../../common/base.repository';
export declare class UserRepository extends BaseRepository {
    logger: Logger;
    private userDataMapper;
    private permissionDataMapper;
    private imageDataMapper;
    constructor(unitOfWork: TransactionUnitOfWork);
    createUser(user: User): Promise<User>;
    findOne(userId: string): Promise<User>;
}
