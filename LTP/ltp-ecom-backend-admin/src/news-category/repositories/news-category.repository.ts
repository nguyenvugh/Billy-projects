import { EntityRepository, Repository } from 'typeorm';
import { NewsCategory } from '../schemas/news-category.schema';

@EntityRepository(NewsCategory)
export class NewsCategoryRepository extends Repository<NewsCategory> { }
