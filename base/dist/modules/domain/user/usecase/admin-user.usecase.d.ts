import { Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AdminCreateUserInputDto } from '../dto/admin-create-user-input.dto';
import { User } from '../entity/user.entity';
export declare class AdminUserUseCase {
    private readonly usersRepository;
    logger: Logger;
    constructor(usersRepository: Repository<User>);
    createUser(adminCreateUserInputDto: AdminCreateUserInputDto): Promise<User>;
    findAll(): Promise<User[]>;
}
