import { EntityRepository, Repository } from 'typeorm';
import { NewsCategorySlugHistory } from '../schemas/news-category-slug-history.schema';

@EntityRepository(NewsCategorySlugHistory)
export class NewsCategorySlugHistoryRepository extends Repository<NewsCategorySlugHistory> {}
