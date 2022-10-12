import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { CategoryTranslation } from '../entities/category-translation.entity';

@EntityRepository(CategoryTranslation)
export class CategoryTranslationRepository extends BaseRepository<CategoryTranslation> {}
