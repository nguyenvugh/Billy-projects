import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { Event } from './event.entity';
import { RegisterInfo } from './register-info.entity';

@Entity('events_to_register_info')
export class EventsToRegisterInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Event, (event: Event) => event.eventsToRegisterInfo)
  @JoinColumn({ name: 'event_id' })
  event: Event;

  @ManyToOne(
    () => RegisterInfo,
    (registerInfo: RegisterInfo) => registerInfo.eventsToRegisterInfo,
  )
  @JoinColumn({ name: 'register_info_id' })
  registerInfo: RegisterInfo;
}
