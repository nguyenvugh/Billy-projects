import { EntityRepository, Repository, Not, AbstractRepository } from 'typeorm';
import { CreateProductAttributeTransDto } from '../dto/create-product.dto';
import { ProductAttributeTranslates } from '../schemas/product-attribute-translate.schema';
import { ProductAttribute } from '../schemas/product-attribute.schema';
import { ProductTranslates } from '../schemas/product-translate.schema';
import { Product } from '../schemas/product.schema';

@EntityRepository(ProductTranslates)
export class ProductTranslateRepo extends Repository<ProductTranslates> {
  async createMulti(listData: CreateProductAttributeTransDto[]) {
    const listCreated = listData.map((data) => {
      return this.create(data);
    });

    return listCreated;
  }
}
