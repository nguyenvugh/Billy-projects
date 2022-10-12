import { EntityRepository, Repository, Not } from 'typeorm';
import { CbiUserLevelEntity } from '../entity/cbi-user-level.entity';

@EntityRepository(CbiUserLevelEntity)
export class CbiUserLevelRepository extends Repository<CbiUserLevelEntity> {}
