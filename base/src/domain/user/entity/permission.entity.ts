import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ROLE } from '../../../constants/user.constant';

@Entity()
export class PermissionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rule: string;

  @Column({
    type: 'enum',
    enum: ROLE,
    default: ROLE.STAFF,
  })
  requiredRole: ROLE;

  @CreateDateColumn({
    type: 'timestamp without time zone',
    name: 'createdAt',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp without time zone',
    name: 'updatedAt',
  })
  updatedAt: Date;
}
