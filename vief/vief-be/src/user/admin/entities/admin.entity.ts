import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { User } from '../../entities/user.entity';
import { GroupPolicies } from '../../../casl/group-policy/entity/group-policies.entity';

@Entity('admin')
@Index(['email', 'deletedAt'], { unique: true })
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ length: 255, type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', length: 255, select: false })
  password: string;
}

export class AdminWithPolicies extends Admin {
  userType: [GroupPolicies];
}
