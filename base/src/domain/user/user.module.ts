import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { UserController } from './controller/user.controller';
import { AdminUserUseCase } from './usecase/admin-user.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [AdminUserUseCase],
  controllers: [UserController],
})
export class UserModule {}
