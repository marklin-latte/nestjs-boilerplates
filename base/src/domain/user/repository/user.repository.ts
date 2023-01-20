import { Injectable, Logger } from '@nestjs/common';

import { Repository } from 'typeorm';
import { User } from '../domainModel/user.dm';
import { UserEntity as UserEntity } from '../entity/user.entity';
import { PermissionEntity as PermissionEntity } from '../entity/permission.entity';
import { ImageEntity as ImageEntity } from '../entity/image.entity';
import { TransactionUnitOfWork } from '../../../infrastructure/database/unit-of-work.interface';
import { SOURCE } from '../../../constants/image.constant';
import { In } from 'typeorm';
import { BaseRepository } from '../../common/base.repository';

/*
 * 該 Repository 為回傳 Domain Model 的範例
 * 同常這種情況下，可能有多個 entity
 */
@Injectable()
export class UserRepository extends BaseRepository {
  logger = new Logger(UserRepository.name);

  // datamapper 是實際上對應到資料庫 table 的
  // 所以一張表就是一個 datamapper
  private userDataMapper: Repository<UserEntity>;
  private permissionDataMapper: Repository<PermissionEntity>;
  private imageDataMapper: Repository<ImageEntity>;

  constructor(unitOfWork: TransactionUnitOfWork) {
    super(unitOfWork);
    this.userDataMapper = this.unitOfWork.registerEntity(UserEntity);
    this.permissionDataMapper =
      this.unitOfWork.registerEntity(PermissionEntity);
    this.imageDataMapper = this.unitOfWork.registerEntity(ImageEntity);
  }

  async createUser(user: User): Promise<User> {
    const newUser = new UserEntity();
    newUser.name = user.name;
    newUser.role = user.role;
    const imageResult = await this.imageDataMapper.save({
      source: SOURCE.GCP,
    });
    const userResult = await this.userDataMapper.save({
      name: user.name,
      role: user.role,
      coverImageId: imageResult.id,
      permissionIds: user.permissions.map((permission) => permission.id),
    });

    const permissions = await this.permissionDataMapper.find({
      where: {
        id: In(user.permissions.map((p) => p.id)),
      },
    });

    return {
      id: userResult.name,
      name: userResult.name,
      coverImage: {
        id: imageResult.id,
        url: `https://hahow.in/images/${imageResult.id}`,
      },
      role: userResult.role,
      permissions: permissions.map((p) => {
        return {
          id: p.id,
          rule: p.rule,
          requiredRole: p.requiredRole,
        };
      }),
    } as User;
  }

  async findOne(userId: string): Promise<User> {
    const userResult = await this.userDataMapper.findOne({
      where: {
        id: userId,
      },
    });
    const [coverImageResult, permissionResult] = await Promise.all([
      this.imageDataMapper.findOne({
        where: {
          id: userResult.coverImageId,
        },
      }),
      this.permissionDataMapper.find({
        where: {
          id: In(userResult.permissionIds),
        },
      }),
    ]);
    return {
      id: userResult.name,
      name: userResult.name,
      coverImage: {
        id: coverImageResult.id,
        url: `https://hahow.in/images/${coverImageResult.id}`,
      },
      role: userResult.role,
      permissions: permissionResult.map((p) => {
        return {
          id: p.id,
          rule: p.rule,
          requiredRole: p.requiredRole,
        };
      }),
      createdAt: userResult.createdAt,
      updatedAt: userResult.updatedAt,
    } as User;
  }
}
