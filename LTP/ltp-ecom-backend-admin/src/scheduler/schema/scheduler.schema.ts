import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  OneToMany,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { BooleanValue } from '../../common/constants';

@Entity({
  name: 'schedulers',
})
export class Scheduler {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, type: 'varchar', name: 'key_identity' })
  @Index({ unique: true })
  key: string;

  @Column({ length: 255, type: 'varchar' })
  name: string;

  @Column({ length: 255, type: 'varchar', name: 'unix_interval' })
  interval: string;

  @Column({
    type: 'tinyint',
    default: BooleanValue.FALSE,
  })
  is_running: number;

  @Column({
    type: 'tinyint',
    default: BooleanValue.FALSE,
  })
  stop_auto_run: number;

  @Column({
    type: 'tinyint',
    default: BooleanValue.TRUE,
  })
  is_active: number;
}
