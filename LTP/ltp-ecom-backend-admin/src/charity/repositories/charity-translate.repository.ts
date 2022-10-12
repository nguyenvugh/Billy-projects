import { EntityRepository, Repository } from 'typeorm';
import { CharityTranslate } from '../schemas/charity-translate.schema';

@EntityRepository(CharityTranslate)
export class CharityTranslateRepository extends Repository<CharityTranslate> { }
