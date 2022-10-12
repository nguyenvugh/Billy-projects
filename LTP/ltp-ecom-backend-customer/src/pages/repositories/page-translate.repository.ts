import { EntityRepository, Repository } from 'typeorm';
import { PageTranslate } from '../schemas/page-translate.schema';

@EntityRepository(PageTranslate)
export class PageTranslateRepository extends Repository<PageTranslate> { }
