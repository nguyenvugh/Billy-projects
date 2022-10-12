import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { RegisterInfo } from '../entities/register-info.entity';

@EntityRepository(RegisterInfo)
export class RegisterInfoRepository extends BaseRepository<RegisterInfo> {}
