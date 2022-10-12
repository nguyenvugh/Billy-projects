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
import { CbiEntity } from '../../cbi/entity/cbi.entity';
import { CbiLevelGroupEntity } from '../../cbi-level-group/entity/cbi-level-group.entity';
import { CbiUserLevelEntity } from '../../../cbi-user/cbi-user-level/entity/cbi-user-level.entity';

@Entity('cbi-levels')
@Index(['cbi_id', 'name'], {
  unique: true,
})
export class CbiLevelEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'slug', type: 'varchar', length: 255, nullable: true })
  @Index({
    unique: true,
  })
  slug: string;

  @Column({ name: 'level', type: 'smallint', default: 1 })
  level: number;

  @Column({ name: 'total_questions', type: 'smallint', default: 0 })
  total_questions: number;

  @Column({
    name: 'auto_calculate_score',
    enum: BooleanStatusEnum,
    default: BooleanStatusEnum.TRUE,
  })
  auto_calculate_score: BooleanStatusEnum;

  @Column({
    name: 'status_publish',
    enum: BooleanStatusEnum,
    default: BooleanStatusEnum.FALSE,
  })
  status_publish: BooleanStatusEnum;

  @Column({ name: 'cbi_id' })
  cbi_id: string;

  @ManyToOne(() => CbiEntity)
  @JoinColumn({ name: 'cbi_id' })
  cbi: CbiEntity;

  @OneToMany(
    () => CbiLevelGroupEntity,
    (cbiLevelGroup) => cbiLevelGroup.cbi_level,
  )
  groups: CbiLevelGroupEntity[];

  @OneToMany(
    () => CbiUserLevelEntity,
    (cbiUserLevelEntity) => cbiUserLevelEntity.cbi_level,
  )
  cbi_user_levels: CbiUserLevelEntity[];
}
