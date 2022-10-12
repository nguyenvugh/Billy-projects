import { EntityRepository, Repository } from 'typeorm';
import { Shop } from '../schema/shop.schema';

@EntityRepository(Shop)
export class ShopRepository extends Repository<Shop> {}
