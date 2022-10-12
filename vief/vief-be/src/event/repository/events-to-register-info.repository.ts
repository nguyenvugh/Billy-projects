import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EventsToRegisterInfo } from '../entities/events-to-register-info.entity';

@EntityRepository(EventsToRegisterInfo)
export class EventsToRegisterInfoRepository extends BaseRepository<EventsToRegisterInfo> {}
