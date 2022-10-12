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
import { CbiUserEntity } from '../../cbi-user/entity/cbi-user.entity';
import { User } from '../../../auth/entities/user.entity';
import { CbiLevelEntity } from '../../../cbi/cbi-level/entity/cbi-level.entity';
import { CbiUserQuestionAnswerEntity } from '../../cbi-user-question-answer/entity/cbi-user-question-answer.entity';

@Entity('cbi_user_levels')
export class CbiUserLevelEntity extends TimestampWithoutSoftDeleteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'total_scores', type: 'decimal', scale: 2, default: 0 })
  total_scores: number;

  @Column({
    name: 'status_finish',
    enum: BooleanStatusEnum,
    default: BooleanStatusEnum.TRUE,
  })
  status_finish: BooleanStatusEnum;

  @Column({
    name: 'status_admin_calculate_score',
    enum: BooleanStatusEnum,
    nullable: true,
  })
  status_admin_calculate_score: BooleanStatusEnum;

  @Column({ name: 'cbi_user_id' })
  cbi_user_id: string;

  @ManyToOne(() => CbiUserEntity)
  @JoinColumn({ name: 'cbi_user_id' })
  cbi_user: CbiUserEntity;

  @Column({ name: 'cbi_level_id' })
  cbi_level_id: string;

  @ManyToOne(() => CbiLevelEntity)
  @JoinColumn({ name: 'cbi_level_id' })
  cbi_level: CbiLevelEntity;

  @Column({ name: 'updated_by', nullable: true })
  updated_by_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'updated_by' })
  updated_by: User;

  @OneToMany(
    () => CbiUserQuestionAnswerEntity,
    (cbiUserQuestionAnswerEntity) => cbiUserQuestionAnswerEntity.cbi_user_level,
    {
      cascade: ['insert', 'update'],
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  cbi_user_question_answers: CbiUserQuestionAnswerEntity[];
}
