import { EntityRepository, Repository } from 'typeorm';
import { Banner } from '../entities/banner.entity';

@EntityRepository(Banner)
export class BannerRepository extends Repository<Banner> {}
