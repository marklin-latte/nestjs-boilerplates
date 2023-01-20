import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminCreateUserInputDto } from '../dto/admin-create-user-input.dto';
import { AdminUserUseCase } from '../usecase/admin-user.usecase';
import { ApiTags, ApiCreatedResponse } from '@nestjs/swagger';
import { AdminCreateUserOutputDto } from '../dto/admin-create-user-output.dto';
import { ServiceAuthGuard } from '../../../infrastructure/auth/service-auth.guard';

@ApiTags('User')
@UseGuards(ServiceAuthGuard)
@Controller()
export class UserController {
  constructor(private readonly adminUserUseCase: AdminUserUseCase) {}

  @Post()
  @ApiCreatedResponse({
    type: AdminCreateUserOutputDto,
  })
  async create(
    @Body() adminCreateUserInputDto: AdminCreateUserInputDto,
  ): Promise<AdminCreateUserOutputDto> {
    const user = await this.adminUserUseCase.createUser(
      adminCreateUserInputDto,
    );
    return {
      id: user.id,
      name: user.name,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    } as AdminCreateUserOutputDto;
  }
}
