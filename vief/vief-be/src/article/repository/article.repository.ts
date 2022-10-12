import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Article } from '../entities/article.entity';

@EntityRepository(Article)
export class ArticleRepository extends BaseRepository<Article> {}
