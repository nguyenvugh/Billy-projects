import { EntityRepository, Repository } from 'typeorm';
import { CharityProduct } from '../schema/charity-product.schema';

@EntityRepository(CharityProduct)
export class CharityProductRepository extends Repository<CharityProduct> { }
