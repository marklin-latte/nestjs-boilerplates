import { AdminUserUseCase } from './admin-user.usecase';
import { ROLE } from '../../../constants/user.constant';
import { Test, TestingModule } from '@nestjs/testing';
import { AdminCreateUserInputDto } from '../dto/admin-create-user-input.dto';
import { ProviderTokens as DataBaseProviderTokens } from '../../../infrastructure/database/database.provider';
import { ProviderTokens as PubSubProviderTokens } from '../../../infrastructure/pubsub/pubsub.provider';
import { User } from '../domainModel/user.dm';

describe('AdminUserUseCase Test', () => {
  let repositoryCreateUserMock: jest.Mock;
  let adminUserUseCase: AdminUserUseCase;

  beforeEach(async () => {
    repositoryCreateUserMock = jest.fn();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminUserUseCase,
        {
          provide: DataBaseProviderTokens.UNIT_OF_WORK,
          useValue: {
            registerRepository: () => {
              return {
                createUser: repositoryCreateUserMock,
              };
            },
          },
        },
        {
          provide: PubSubProviderTokens.PUBSUB_SERVICE,
          useValue: {
            publish: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    adminUserUseCase = module.get<AdminUserUseCase>(AdminUserUseCase);
  });

  afterEach(() => {
    repositoryCreateUserMock.mockRestore();
  });

  it('should successfully create a new user', async () => {
    // Arrange
    const input = {
      name: 'mark',
      role: ROLE.STAFF,
      coverImageId: '507f191e810c19729de860ea',
      permissionIds: ['507f191e810c19729de860ea', '507f191e810c19729de860ea'],
    } as AdminCreateUserInputDto;
    repositoryCreateUserMock.mockResolvedValue({
      id: '507f191e810c19729de860ea',
      name: input.name,
      role: input.role,
      coverImage: {
        id: input.coverImageId,
        url: `https://hahow.in/images/${input.coverImageId}`,
      },
      permissions: [
        {
          id: '507f191e810c19729de860ea',
          rule: 'You are a god',
          requiredRole: ROLE.STAFF,
        },
      ],
    } as User);

    // Act
    const result: User = await adminUserUseCase.createUser(input);

    // Assert
    expect({
      name: result.name,
      role: result.role,
    }).toEqual({
      name: input.name,
      role: input.role,
    });
  });
});
