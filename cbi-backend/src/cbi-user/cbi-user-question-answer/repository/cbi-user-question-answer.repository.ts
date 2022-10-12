import { EntityRepository, Repository, Not } from 'typeorm';
import { CbiUserQuestionAnswerEntity } from '../entity/cbi-user-question-answer.entity';

@EntityRepository(CbiUserQuestionAnswerEntity)
export class CbiUserQuestionAnswerRepository extends Repository<CbiUserQuestionAnswerEntity> {}
