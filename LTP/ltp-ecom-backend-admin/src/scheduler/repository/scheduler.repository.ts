import { EntityRepository, Repository } from 'typeorm';
import { Scheduler } from '../schema/scheduler.schema';

@EntityRepository(Scheduler)
export class SchedulerRepository extends Repository<Scheduler> {}
