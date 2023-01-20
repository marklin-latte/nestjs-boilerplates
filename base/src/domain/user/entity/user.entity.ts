import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ROLE } from '../../../constants/user.constant';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: ROLE,
  })
  role: ROLE;

  @Column()
  coverImageId: string;

  @Column('simple-array')
  permissionIds: string[];

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
