import { BadRequestException } from '@nestjs/common';
import { ROLE } from '../../../constants/user.constant';

export class User {
  id: string;
  name: string;
  coverImage: Image;
  role: ROLE;
  permissions: Permission[];
  updatedAt: Date;
  createdAt: Date;

  addPermission(permission: Permission): void {
    if (permission.requiredRole !== this.role) {
      throw new BadRequestException('the role is not qualified');
    }

    this.permissions.push(permission);
  }
}

export class Permission {
  id: string;
  rule: string;
  requiredRole: ROLE;
}

export class Image {
  id: string;
  url: string;
}
