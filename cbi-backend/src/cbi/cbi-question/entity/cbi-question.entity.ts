import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { BooleanStatusEnum } from '../../../common/constants/global.constant';
import { TimestampWithoutSoftDeleteEntity } from '../../../common/entities/base.entity';
import { CbiLevelGroupEntity } from '../../cbi-level-group/entity/cbi-level-group.entity';
import { CbiQuestionOptionEntity } from '../../cbi-question-option/entity/cbi-question-option.entity';

@Entity('cbi-questions')
@Index(['cbi_level_group_id', 'title'], {
  unique: true,
})
export class CbiQuestionEntity extends TimestampWithoutSoftDeleteEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', type: 'text' })
  title: string;

  @Column({ name: 'order_display', type: 'smallint', default: 1 })
  order_display: number;

  @Column({
    name: 'status_answer_mandatory',
    enum: BooleanStatusEnum,
    default: BooleanStatusEnum.TRUE,
  })
  status_answer_mandatory: BooleanStatusEnum;

  @Column({ name: 'total_scores', type: 'decimal', scale: 2, default: 0 })
  total_scores: number;

  @Column({ name: 'cbi_level_group_id' })
  cbi_level_group_id: string;

  @ManyToOne(() => CbiLevelGroupEntity)
  @JoinColumn({ name: 'cbi_level_group_id' })
  cbi_level_group: CbiLevelGroupEntity;

  @OneToMany(
    () => CbiQuestionOptionEntity,
    (cbiQuestionOption) => cbiQuestionOption.cbi_question,
    {
      cascade: ['insert', 'update'],
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  options: CbiQuestionOptionEntity[];
}
