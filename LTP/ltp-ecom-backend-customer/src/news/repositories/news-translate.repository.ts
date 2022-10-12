import { EntityRepository, Repository } from 'typeorm';
import { NewsTranslate } from '../schemas/news-translate.schema';

@EntityRepository(NewsTranslate)
export class NewsTranslateRepository extends Repository<NewsTranslate> { }
