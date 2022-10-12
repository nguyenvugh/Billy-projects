import { EntityRepository, Repository } from 'typeorm';
import { CharityTranslate } from '../schema/charity-translate.schema';

@EntityRepository(CharityTranslate)
export class CharityTranslateRepository extends Repository<CharityTranslate> { }
