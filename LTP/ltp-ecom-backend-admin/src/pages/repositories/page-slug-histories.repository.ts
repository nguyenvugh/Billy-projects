import { EntityRepository, Repository } from 'typeorm';
import { PageSlugHistory } from '../schemas/page-slug-histories.schema';

@EntityRepository(PageSlugHistory)
export class PageSlugHistoryRepository extends Repository<PageSlugHistory> {}
