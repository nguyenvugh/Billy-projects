import { EntityRepository, Repository, Not, AbstractRepository } from 'typeorm';
import { CreateProductAttributeTransDto } from '../dto/create-product.dto';
import { ProductAttributeTranslates } from '../schemas/product-attribute-translate.schema';
import { ProductAttribute } from '../schemas/product-attribute.schema';
import { ProductSlugHistory } from '../schemas/product-slug-history.schema';
import { Product } from '../schemas/product.schema';

@EntityRepository(ProductSlugHistory)
export class ProductSlugHistoryRepo extends Repository<ProductSlugHistory> {}
