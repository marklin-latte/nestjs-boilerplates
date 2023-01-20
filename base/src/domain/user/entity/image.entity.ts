import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SOURCE } from '../../../constants/image.constant';

@Entity()
export class ImageEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: SOURCE,
  })
  source: SOURCE;

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
