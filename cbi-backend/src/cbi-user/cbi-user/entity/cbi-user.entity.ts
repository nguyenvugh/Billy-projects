import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BooleanStatusEnum } from '../../../common/constants/global.constant';
import { TimestampWithoutSoftDeleteEntity } from '../../../common/entities/base.entity';
import { User } from '../../../auth/entities/user.entity';
import { CbiEntity } from '../../../cbi/cbi/entity/cbi.entity';
import { CbiUserLevelEntity } from '../../cbi-user-level/entity/cbi-user-level.entity';

@Entity('cbi_users')
export class CbiUserEntity extends TimestampWithoutSoftDeleteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'total_scores', type: 'decimal', scale: 2, default: 0 })
  total_scores: number;

  @Column({
    name: 'status_pass',
    enum: BooleanStatusEnum,
    default: BooleanStatusEnum.FALSE,
  })
  status_pass: BooleanStatusEnum;

  @Column({ name: 'title_earned', type: 'text', nullable: true })
  title_earned: string;

  @Column({ name: 'time_to_test_again', type: 'timestamptz', nullable: true })
  time_to_test_again: Date;

  @Column({ name: 'user_id' })
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'cbi_id' })
  cbi_id: string;

  @ManyToOne(() => CbiEntity)
  @JoinColumn({ name: 'cbi_id' })
  cbi: CbiEntity;

  @OneToMany(
    () => CbiUserLevelEntity,
    (cbiUserLevelEntity) => cbiUserLevelEntity.cbi_user,
    {
      cascade: ['insert', 'update'],
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  cbi_user_levels: CbiUserLevelEntity[];
}
