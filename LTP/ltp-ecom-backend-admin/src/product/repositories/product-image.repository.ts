import { EntityRepository, Repository, Not, AbstractRepository } from 'typeorm';
import { ProductAttribute } from '../schemas/product-attribute.schema';
import { ProductImage } from '../schemas/product-image.schema';
import { Product } from '../schemas/product.schema';

@EntityRepository(ProductImage)
export class ProductImageRepo extends Repository<ProductImage> {}
