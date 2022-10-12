import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { ArticleTranslation } from '../entities/article-translation.entity';

@EntityRepository(ArticleTranslation)
export class ArticleTranslationRepository extends BaseRepository<ArticleTranslation> {}
