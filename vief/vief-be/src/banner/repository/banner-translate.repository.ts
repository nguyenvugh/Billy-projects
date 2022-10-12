import { EntityRepository, Repository } from 'typeorm';
import { BannerTranslation } from '../entities/banner-translation.entity';

@EntityRepository(BannerTranslation)
export class BannerTranslationRepository extends Repository<BannerTranslation> {}
