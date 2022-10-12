import { BaseEntity } from 'src/common/entities/base.entity';
import { FileAdmin } from 'src/file/entities/file-admin.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_documents')
export class UserDocument extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  description: string;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => FileAdmin, (file) => file.id)
  @JoinColumn({ name: 'file_id' })
  file: FileAdmin;
}
