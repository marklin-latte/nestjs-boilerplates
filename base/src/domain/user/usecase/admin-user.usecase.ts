import { Injectable, Logger, Inject } from '@nestjs/common';
import { AdminCreateUserInputDto } from '../dto/admin-create-user-input.dto';
import { ProviderTokens as PubSubProviderTokens } from '../../../infrastructure/pubsub/pubsub.provider';
import { ProviderTokens as DatabaseProviderTokens } from '../../../infrastructure/database/database.provider';
import { BaseUseCase } from '../../common/base.usecase';
import { UserRepository } from '../repository/user.repository';
import { User, Image } from '../domainModel/user.dm';
import { ROLE } from '../../../constants/user.constant';
import { PubSubService } from '../../../infrastructure/pubsub/supplement/pubsub.interface';
import { TransactionUnitOfWork } from '../../../infrastructure/database/unit-of-work.interface';

@Injectable()
export class AdminUserUseCase extends BaseUseCase {
  logger = new Logger(AdminUserUseCase.name);
  private readonly userRepository: UserRepository;

  constructor(
    @Inject(PubSubProviderTokens.PUBSUB_SERVICE)
    pubsubService: PubSubService,
    @Inject(DatabaseProviderTokens.UNIT_OF_WORK)
    unitOfWork: TransactionUnitOfWork,
  ) {
    super(unitOfWork, pubsubService);
    this.userRepository = this.unitOfWork.registerRepository(UserRepository);
  }

  async createUser(
    adminCreateUserInputDto: AdminCreateUserInputDto,
  ): Promise<User> {
    const user = new User();
    user.name = adminCreateUserInputDto.name;
    user.coverImage = {
      id: adminCreateUserInputDto.coverImageId,
    } as Image;
    user.role = adminCreateUserInputDto.role;
    user.name = adminCreateUserInputDto.name;
    user.permissions = adminCreateUserInputDto.permissionIds.map((id) => {
      return {
        id,
        rule: 'test',
        requiredRole: ROLE.PADA,
      };
    });
    const result = await this.userRepository.createUser(user);
    this.logger.log(`${result.name} has been created !!!`);

    return result;
  }

  async findUserById(userId: string): Promise<User> {
    return this.userRepository.findOne(userId);
  }
}
