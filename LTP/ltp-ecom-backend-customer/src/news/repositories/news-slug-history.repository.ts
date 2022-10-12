import { EntityRepository, Repository } from 'typeorm';
import { NewsSlugHistory } from '../schemas/news-slug-history.schema';

@EntityRepository(NewsSlugHistory)
export class NewsSlugHistoryRepository extends Repository<NewsSlugHistory> {}
