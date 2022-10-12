import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Event } from '../entities/event.entity';

@EntityRepository(Event)
export class EventRepository extends BaseRepository<Event> {}
