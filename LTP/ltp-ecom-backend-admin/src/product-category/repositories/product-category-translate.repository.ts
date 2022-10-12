import { EntityRepository, Repository, Not, AbstractRepository } from 'typeorm';
import { CreateProductCategoryTransDto } from '../dto/create-product-category.dto';
import { ProductCategoryTranslate } from '../schemas/product-category-translate.schema';

@EntityRepository(ProductCategoryTranslate)
export class ProductCategoryTranslateRepository extends Repository<ProductCategoryTranslate> {
  async createMulti(listData: CreateProductCategoryTransDto[]) {
    const listCreated = listData.map((data) => {
      return this.create(data);
    });
    return listCreated;
  }
}
