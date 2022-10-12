import { EntityRepository, Repository, Not, AbstractRepository } from 'typeorm';
import { CreateProductAttributeTransDto } from '../dto/create-product.dto';
import { ProductAttributeTranslates } from '../schemas/product-attribute-translate.schema';
import { ProductAttribute } from '../schemas/product-attribute.schema';
import { Product } from '../schemas/product.schema';

@EntityRepository(ProductAttributeTranslates)
export class ProductAttributeTranslateRepo extends Repository<ProductAttributeTranslates> {
  async createMulti(listData: CreateProductAttributeTransDto[]) {
    const listCreated = listData.map((data) => {
      return this.create(data);
    });

    return listCreated;
  }
}
