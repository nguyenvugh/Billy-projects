import { EntityRepository, Repository, Not } from 'typeorm';
import { CbiQuestionOptionValueEntity } from '../entity/cbi-question-option-value.entity';

@EntityRepository(CbiQuestionOptionValueEntity)
export class CbiQuestionOptionValueRepository extends Repository<CbiQuestionOptionValueEntity> {}
