import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { EventTranslation } from '../entities/event-translation.entity';

@EntityRepository(EventTranslation)
export class EventTranslationRepository extends BaseRepository<EventTranslation> {}
