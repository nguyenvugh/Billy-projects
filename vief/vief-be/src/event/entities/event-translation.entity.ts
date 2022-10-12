import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import {
  LangEnum,
  NameConstraintEntity,
} from '../../common/constants/global.constant';
import { BaseEntity } from '../../common/entities/base.entity';
import { Event } from './event.entity';

@Entity('events_translation')
@Unique(NameConstraintEntity.UQ_SLUG_EVENT, ['slug', 'deletedAt'])
export class EventTranslation extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: LangEnum })
  lang: LangEnum;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column()
  shortDesc: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => Event, (event: Event) => event.translates, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'event_id' })
  event: Event;
}
