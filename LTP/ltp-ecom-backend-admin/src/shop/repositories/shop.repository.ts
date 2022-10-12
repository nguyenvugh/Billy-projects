import { EntityRepository, Repository } from 'typeorm';
import { Shop } from '../schemas/shop.schema';

@EntityRepository(Shop)
export class ShopRepository extends Repository<Shop> { }
