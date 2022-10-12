import { MediaUpload } from 'src/media-upload/schemas/media-upload.schema';
import { EntityRepository, Repository, Not, AbstractRepository } from 'typeorm';
import { CreateProductCategoryDto } from '../dto/create-product-category.dto';
import { ProductCategoryTranslate } from '../schemas/product-category-translate.schema';
import { ProductCategory } from '../schemas/product-category.schema';

@EntityRepository(ProductCategory)
export class ProductCategoryRepository extends Repository<ProductCategory> {
  async createProductCate(
    image: MediaUpload,
    // body: CreateProductCategoryDto,
    // listTrans: ProductCategoryTranslate,
  ) {
    const newRecord = this.create({ image_obj: image });
    const created = await this.save(newRecord);
    return created;
  }

  async findAll() {
    return this.find();
  }

  // findInIds(ids: number[]) {
  //   return this.findByIds(ids);
  // }
}
