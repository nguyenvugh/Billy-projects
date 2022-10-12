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
import { CbiUserLevelEntity } from '../../cbi-user-level/entity/cbi-user-level.entity';
import { CbiQuestionEntity } from '../../../cbi/cbi-question/entity/cbi-question.entity';
import { CbiQuestionOptionEntity } from '../../../cbi/cbi-question-option/entity/cbi-question-option.entity';
import { CbiQuestionOptionValueEntity } from '../../../cbi/cbi-question-option-value/entity/cbi-question-option-value.entity';

@Entity('cbi_user_question_answers')
export class CbiUserQuestionAnswerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'score', type: 'decimal', scale: 2, default: 0 })
  score: number;

  @Column({ name: 'content_answer', type: 'text', nullable: true })
  content_answer: string;

  @Column({ name: 'cbi_user_level_id' })
  cbi_user_level_id: string;

  @ManyToOne(() => CbiUserLevelEntity)
  @JoinColumn({ name: 'cbi_user_level_id' })
  cbi_user_level: CbiUserLevelEntity;

  @Column({ name: 'cbi_question_id' })
  cbi_question_id: string;

  @ManyToOne(() => CbiQuestionEntity)
  @JoinColumn({ name: 'cbi_question_id' })
  cbi_question: CbiQuestionEntity;

  @Column({ name: 'cbi_question_option_id' })
  cbi_question_option_id: string;

  @ManyToOne(() => CbiQuestionOptionEntity)
  @JoinColumn({ name: 'cbi_question_option_id' })
  cbi_question_option: CbiQuestionOptionEntity;

  @Column({ name: 'cbi_question_option_value_id' })
  cbi_question_option_value_id: string;

  @ManyToOne(() => CbiQuestionOptionValueEntity)
  @JoinColumn({ name: 'cbi_question_option_value_id' })
  cbi_question_option_value: CbiQuestionOptionValueEntity;
}
