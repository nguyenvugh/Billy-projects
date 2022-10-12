import { EntityRepository, Repository } from 'typeorm';
import { ConfigOxfam } from './entities/config-oxfam.entity';

@EntityRepository(ConfigOxfam)
export class ConfigOxfamRepository extends Repository<ConfigOxfam> {}
