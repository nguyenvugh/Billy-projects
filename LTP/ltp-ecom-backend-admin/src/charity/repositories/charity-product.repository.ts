import { EntityRepository, Repository } from 'typeorm';
import { CharityProduct } from '../schemas/charity-product.schema';

@EntityRepository(CharityProduct)
export class CharityProductRepository extends Repository<CharityProduct> { }
