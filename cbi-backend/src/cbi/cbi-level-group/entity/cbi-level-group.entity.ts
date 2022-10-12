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
import { CbiLevelEntity } from '../../cbi-level/entity/cbi-level.entity';
import { CbiQuestionEntity } from '../../cbi-question/entity/cbi-question.entity';

@Entity('cbi-level-groups')
@Index(['cbi_level_id', 'name'], {
  unique: true,
})
export class CbiLevelGroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'description', type: 'text', nullable: true })
  description: string;

  @Column({ name: 'order_display', type: 'smallint', default: 1 })
  order_display: number;

  @Column({ name: 'cbi_level_id' })
  cbi_level_id: string;

  @ManyToOne(() => CbiLevelEntity)
  @JoinColumn({ name: 'cbi_level_id' })
  cbi_level: CbiLevelEntity;

  @OneToMany(
    () => CbiQuestionEntity,
    (cbiQuestion) => cbiQuestion.cbi_level_group,
  )
  questions: CbiQuestionEntity[];
}
