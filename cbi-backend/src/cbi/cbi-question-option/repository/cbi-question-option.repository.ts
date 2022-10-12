import { EntityRepository, Repository, Not } from 'typeorm';
import { CbiQuestionOptionEntity } from '../entity/cbi-question-option.entity';

@EntityRepository(CbiQuestionOptionEntity)
export class CbiQuestionOptionRepository extends Repository<CbiQuestionOptionEntity> {}
