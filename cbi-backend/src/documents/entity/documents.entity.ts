import { BaseEntity } from 'src/common/entities/base.entity';
import { FileAdmin } from 'src/file/entities/file-admin.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('documents')
export class Documents extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @ManyToOne(() => User, (user) => user.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @OneToOne(() => FileAdmin, (file) => file.id)
  @JoinColumn({ name: 'file_id' })
  file: FileAdmin;
}
