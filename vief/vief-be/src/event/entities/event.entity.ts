import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import {
  BooleanEnum,
  DEPARTMENT_NAME,
} from '../../common/constants/global.constant';
import { BaseEntity } from '../../common/entities/base.entity';
import { File } from '../../file/entities/file.entity';
import { EventTranslation } from './event-translation.entity';
import { EventsToRegisterInfo } from './events-to-register-info.entity';

@Entity('events')
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: DEPARTMENT_NAME })
  field: DEPARTMENT_NAME;

  @OneToOne(() => File, (file) => file.id, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'thumbnail_id' })
  thumbnail: File;

  @Column()
  location: string;

  @Column({ type: 'timestamptz' })
  timeStart: Date;

  @Column({ enum: BooleanEnum })
  isFeature: BooleanEnum;

  @OneToMany(
    () => EventTranslation,
    (eventTranslate: EventTranslation) => eventTranslate.event,
    {
      cascade: true,
    },
  )
  translates: EventTranslation[];

  @OneToMany(
    () => EventsToRegisterInfo,
    (eventsToRegisterInfo: EventsToRegisterInfo) => eventsToRegisterInfo.event,
  )
  eventsToRegisterInfo: EventsToRegisterInfo[];
}
