import { randomUUID } from 'crypto';
import { UserEntity } from '../../src/domain/user/entity/user.entity';
import { ROLE } from '../../src/constants/user.constant';
import { DataSource } from 'typeorm';
import { ImageEntity } from '../../src/domain/user/entity/image.entity';
import { SOURCE } from '../../src/constants/image.constant';
import { PermissionEntity } from '../../src/domain/user/entity/permission.entity';

export class UserHelper {
  private connection: DataSource;
  constructor(connection: DataSource) {
    this.connection = connection;
  }

  async generateUser(body: any = {}): Promise<UserEntity> {
    const entity = new UserEntity();
    entity.id = randomUUID();
    entity.name = body.name || 'mark';
    entity.role = ROLE.STAFF;
    entity.createdAt = body.createdAt || new Date();
    entity.updatedAt = body.updatedAt || new Date();

    const result = await this.connection.manager.save(UserEntity, entity);
    return result;
  }

  async generateImage(body: any = {}): Promise<ImageEntity> {
    const image = new ImageEntity();
    image.source = body.source || SOURCE.GCP;

    const result = await this.connection.manager.save(image);
    return result;
  }

  async generatePermission(body: any = {}): Promise<PermissionEntity> {
    const permission = new PermissionEntity();
    permission.rule = body.rule || 'create article';
    permission.requiredRole = body.requiredRole || ROLE.STAFF;

    const result = await this.connection.manager.save(permission);
    return result;
  }
}
