import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { EventsToRegisterInfo } from './events-to-register-info.entity';

@Entity('register_info')
export class RegisterInfo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  fullName: string;

  @OneToMany(
    () => EventsToRegisterInfo,
    (eventsToRegisterInfo: EventsToRegisterInfo) =>
      eventsToRegisterInfo.registerInfo,
  )
  eventsToRegisterInfo: EventsToRegisterInfo[];
}
