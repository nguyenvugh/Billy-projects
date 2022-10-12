import { EntityRepository, Repository, Not } from 'typeorm';
import { CbiUserEntity } from '../entity/cbi-user.entity';

@EntityRepository(CbiUserEntity)
export class CbiUserRepository extends Repository<CbiUserEntity> {}
