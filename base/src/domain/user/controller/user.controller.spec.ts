import { Test, TestingModule } from '@nestjs/testing';
import { ROLE } from '../../../constants/user.constant';
import { ServiceAuthGuard } from '../../../infrastructure/auth/service-auth.guard';
import { AdminCreateUserInputDto } from '../dto/admin-create-user-input.dto';
import { AdminUserUseCase } from '../usecase/admin-user.usecase';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;
  let useCaseCreateUserMock: jest.Mock;

  beforeEach(async () => {
    useCaseCreateUserMock = jest.fn().mockResolvedValue({});
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: AdminUserUseCase,
          useValue: {
            createUser: useCaseCreateUserMock,
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should call once createUser of user usecase, and return use', async () => {
    // Arrange
    const newUser = new AdminCreateUserInputDto();
    newUser.name = 'mark';
    newUser.role = ROLE.PADA;
    newUser.coverImageId = '507f191e810c19729de860ea';
    newUser.permissionIds = ['507f191e810c19729de860ea'];
    useCaseCreateUserMock.mockResolvedValue({
      name: newUser.name,
    });

    // Act
    const result: any = await controller.create(newUser);

    // Assert
    expect(result.name).toEqual(newUser.name);
  });

  describe('Controller Decorator Test', () => {
    it('should ensure the ServiceAuthGuard is applied to the controller', async () => {
      const guards = Reflect.getMetadata('__guards__', UserController);
      const guard = new guards[0]();

      expect(guard).toBeInstanceOf(ServiceAuthGuard);
    });
  });
});
