import { EntityRepository, Repository } from 'typeorm';
import { NewsCategoryTranslate } from '../schemas/news-category-translate.schema';

@EntityRepository(NewsCategoryTranslate)
export class NewsCategoryTranslateRepository extends Repository<NewsCategoryTranslate> { }
