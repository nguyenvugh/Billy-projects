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
import { CbiQuestionOptionTypeEnum } from '../constant';
import { TimestampOnlyCreateEntity } from '../../../common/entities/base.entity';
import { CbiQuestionEntity } from '../../cbi-question/entity/cbi-question.entity';
import { CbiQuestionOptionValueEntity } from '../../cbi-question-option-value/entity/cbi-question-option-value.entity';

@Entity('cbi-question-options')
export class CbiQuestionOptionEntity extends TimestampOnlyCreateEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    name: 'type',
    enum: CbiQuestionOptionTypeEnum,
  })
  @Index()
  type: CbiQuestionOptionTypeEnum;

  @Column({ name: 'order_display', type: 'smallint', default: 1 })
  order_display: number;

  @Column({ name: 'cbi_question_id' })
  cbi_question_id: string;

  @ManyToOne(() => CbiQuestionEntity)
  @JoinColumn({ name: 'cbi_question_id' })
  cbi_question: CbiQuestionEntity;

  @OneToMany(
    () => CbiQuestionOptionValueEntity,
    (cbiQuestionOptionValue) => cbiQuestionOptionValue.cbi_question_option,
    {
      cascade: ['insert', 'update'],
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  values: CbiQuestionOptionValueEntity[];
}
