import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BooleanStatusEnum } from '../../../common/constants/global.constant';
import { TimestampOnlyCreateEntity } from '../../../common/entities/base.entity';
import { CbiQuestionOptionEntity } from '../../cbi-question-option/entity/cbi-question-option.entity';

@Entity('cbi-question-option-values')
export class CbiQuestionOptionValueEntity extends TimestampOnlyCreateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'title', type: 'text' })
  title: string;

  @Column({ name: 'score', type: 'decimal', scale: 2, default: 0 })
  score: number;

  @Column({
    name: 'status_right_option_value',
    enum: BooleanStatusEnum,
    nullable: true,
  })
  status_right_option_value: BooleanStatusEnum;

  @Column({ name: 'order_display', type: 'smallint', default: 1 })
  order_display: number;

  @Column({ name: 'cbi_question_option_id' })
  cbi_question_option_id: string;

  @ManyToOne(() => CbiQuestionOptionEntity)
  @JoinColumn({ name: 'cbi_question_option_id' })
  cbi_question_option: CbiQuestionOptionEntity;
}
