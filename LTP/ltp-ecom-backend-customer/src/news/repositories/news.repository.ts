import { EntityRepository, Repository } from 'typeorm';
import { News } from '../schemas/news.schema';

@EntityRepository(News)
export class NewsRepository extends Repository<News> { }
