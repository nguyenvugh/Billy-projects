import {
  BadRequestExc,
  ConflictExc,
  NotFoundExc,
} from './../common/exceptions/custom.exception';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { MediaUploadService } from 'src/media-upload/media-upload.service';
import { MediaUploadRepository } from 'src/media-upload/repositories/media-upload.repository';
import { SlugService } from '../common/services/slug.service';
import { convertVietnameseCharsToEnglishChars } from '../common/helpers/util.helper';
import {
  CreateProductCategoryDto,
  CreateProductCategoryTransDto,
} from './dto/create-product-category.dto';
import { UpdateProductCategoryDto } from './dto/update-product-category.dto';
import { UpdateProductCategoriesDisplayOrderDto } from './dto/update-product-categories-display-order.dto';
import { ProductCategoryTranslateRepository } from './repositories/product-category-translate.repository';
import { ProductCategorySlugHistoryRepository } from './repositories/product-category-slug-history.repository';
import { ProductCategoryRepository } from './repositories/product-category.repository';
import { transcode } from 'buffer';
import { FindAdminProductCategoryDto } from './dto/find-admin-product-category.dto';
import { IsNull, Like, Not } from 'typeorm';
import {
  BooleanValue,
  MAX_FEATURE_PRODUCT_CATEGORY,
} from 'src/common/constants';

@Injectable()
export class ProductCategoryService {
  constructor(
    private mediaUploadService: MediaUploadService,
    private productCategoryRepo: ProductCategoryRepository,
    private productCategoryTransRepo: ProductCategoryTranslateRepository,
    private productCategorySlugHistoryRepo: ProductCategorySlugHistoryRepository,
    private slugService: SlugService,
  ) {}

  async initSlugData() {
    const productCategoryNamesData = await this.productCategoryTransRepo.find({
      where: {
        language_field: 'name',
      },
      order: {
        id: 'ASC',
      },
    });
    const groupProductCategoryBySlugs: any = {};
    if (productCategoryNamesData.length) {
      productCategoryNamesData.forEach((item) => {
        const productCategorySlug = this.slugService.slug(item.language_value);
        if (
          false ==
          groupProductCategoryBySlugs.hasOwnProperty(productCategorySlug)
        ) {
          groupProductCategoryBySlugs[productCategorySlug] = [];
        }
        groupProductCategoryBySlugs[productCategorySlug].push({
          product_category_id: item.product_category_id,
          language_code: item.language_code,
        });
      });
    }
    const dataInitSlug: any[] = [];
    for (const productCategorySlug in groupProductCategoryBySlugs) {
      if (
        true == groupProductCategoryBySlugs.hasOwnProperty(productCategorySlug)
      ) {
        const productCategoryItems =
          groupProductCategoryBySlugs[productCategorySlug];
        for (let index = 0; index < productCategoryItems.length; index++) {
          const productCategoryItem = productCategoryItems[index];
          dataInitSlug.push({
            product_category_id: productCategoryItem.product_category_id,
            language_code: productCategoryItem.language_code,
            language_field: 'slug',
            language_value:
              0 == index
                ? productCategorySlug
                : `${productCategorySlug}-${index + 1}`,
          });
        }
      }
    }
    await this.productCategoryTransRepo.delete({
      language_field: 'slug',
    });
    await this.productCategoryTransRepo.save(dataInitSlug);

    return 'success';
  }

  async create(body: CreateProductCategoryDto) {
    const { image, parent, is_feature, code, translates } = body;

    // Get image, product category, category translations
    const imageData = await this.mediaUploadService.findOne(image);
    // Need to check if image is exist.
    if (!imageData) throw new NotFoundExc();

    let existParent = null;
    if (parent) {
      existParent = await this.productCategoryRepo.findOne(parent);
      if (!existParent) throw new BadRequestExc();
    }

    const newContentsTranslate =
      await this.generateContentsTranslateIncludeSlugs(translates);
    if (!newContentsTranslate.length) {
      throw new BadRequestExc('Slug danh mục bị trùng!');
    }

    const createdProductCate = await this.productCategoryRepo.create();

    // Check if name is exist.
    const optionsFind = [];
    translates.forEach((trans) => {
      if (trans.language_field === 'name') {
        optionsFind.push({
          language_code: trans.language_code,
          language_field: 'name',
          language_value: trans.language_value,
        });
      }
    });
    const existName = await this.productCategoryTransRepo.findOne({
      where: optionsFind,
    });

    if (existName) throw new ConflictExc('Tên danh mục đã bị trùng!');

    // Check if code is exist.
    const existCode = await this.productCategoryRepo.findOne({ code });
    if (existCode) throw new ConflictExc('Mã danh mục đã bị trùng');

    // check number of is_feature
    if (is_feature === BooleanValue.TRUE) {
      const featureProductCates = await this.productCategoryRepo.find({
        is_feature: BooleanValue.TRUE,
      });

      if (featureProductCates.length >= MAX_FEATURE_PRODUCT_CATEGORY) {
        throw new BadRequestExc('Số lượng Feature product category đã đủ!');
      }
    }

    // Create category after verify all condition
    const listCreated = await this.productCategoryTransRepo.createMulti(
      newContentsTranslate,
    );

    createdProductCate.translates = listCreated;
    createdProductCate.image_obj = imageData;
    createdProductCate.is_feature = is_feature;
    createdProductCate.code = code;
    if (parent) createdProductCate.parent_obj = existParent;
    return await this.productCategoryRepo.save(createdProductCate);
  }

  async findAll(params: FindAdminProductCategoryDto) {
    const { page, limit, is_sub, parent } = params;
    const skip = (page - 1) * limit;
    const options = {
      ...(is_sub && { parent: is_sub !== 1 ? IsNull() : Not(IsNull()) }),
      ...(parent && { parent }),
    };

    const [results, total] = await this.productCategoryRepo.findAndCount({
      where: options,
      relations: ['parent_obj'],
      order: { created_at: 'DESC' },
      take: limit,
      skip,
    });

    return { results, total };
  }

  async findOne(id: number) {
    const exist = await this.productCategoryRepo.findOne(id);
    if (!exist) throw new NotFoundExc();

    return exist;
  }

  async update(id: number, updateCategoryDto: UpdateProductCategoryDto) {
    delete updateCategoryDto.id;
    const { image, parent, translates, is_feature, code } = updateCategoryDto;
    const exist = await this.productCategoryRepo
      .createQueryBuilder('product_category')
      .innerJoinAndSelect(
        'product_category.translates',
        'product_category_translates',
      )
      .where({
        id: id,
      })
      .getOne();
    if (!exist) throw new NotFoundExc();

    const oldSlug: any = {};
    exist.translates.forEach((translate) => {
      if ('slug' == translate.language_field) {
        oldSlug[translate.language_code] = translate.language_value;
      }
    });

    const newContentsTranslate =
      await this.generateContentsTranslateIncludeSlugs(translates, id);
    if (!newContentsTranslate.length) {
      throw new BadRequestExc('Slug danh mục bị trùng!');
    }

    // console.log('updateCategoryDto', exist.translates);
    if (image) {
      const existImg = await this.mediaUploadService.findOne(image);
      if (!existImg) throw new BadRequestExc();
      exist.image_obj = existImg;
    }

    if (parent) {
      const existParent = await this.productCategoryRepo.findOne(parent);
      if (!existParent) throw new BadRequestExc();
      exist.parent_obj = existParent;
    }

    // check number of is_feature
    if (is_feature === BooleanValue.TRUE) {
      const featureProductCates = await this.productCategoryRepo.find({
        is_feature: BooleanValue.TRUE,
      });
      const listIds = featureProductCates.map((cate) => cate.id);

      if (
        listIds.length >= MAX_FEATURE_PRODUCT_CATEGORY &&
        !listIds.includes(exist.id)
      ) {
        throw new BadRequestExc('Số lượng Feature product category đã đủ!');
      }
    }

    // pass validate
    exist.is_feature = is_feature;

    if (code) {
      // Check if code is exist.
      const existCode = await this.productCategoryRepo.findOne({ code });
      if (existCode) {
        if (existCode.id !== exist.id) throw new ConflictExc();
      }

      exist.code = code;
    }

    // Check if name is exist.
    const optionsFind = [];
    newContentsTranslate.forEach((trans) => {
      if (trans.language_field === 'name') {
        optionsFind.push({
          language_code: trans.language_code,
          language_field: 'name',
          language_value: trans.language_value,
        });
      }
    });
    const existName = await this.productCategoryTransRepo.findOne({
      where: optionsFind,
      relations: ['product_category_obj'],
    });

    if (existName) {
      if (existName.product_category_obj.id !== exist.id)
        throw new ConflictExc('Tên danh mục đã bị trùng!');
    }

    const dataSaveSlugHistories: any[] = [];
    exist.translates.forEach((trans) => {
      const existTrans = newContentsTranslate.find(
        (updateTrans) =>
          updateTrans.language_code === trans.language_code &&
          updateTrans.language_field === trans.language_field,
      );

      if (existTrans) {
        trans.language_value = existTrans.language_value;

        if ('slug' == existTrans.language_field) {
          if (true == oldSlug.hasOwnProperty(existTrans.language_code)) {
            if (
              oldSlug[existTrans.language_code] != existTrans.language_value
            ) {
              dataSaveSlugHistories.push({
                product_category_id: id,
                language_code: existTrans.language_code,
                slug: oldSlug[existTrans.language_code],
              });
            }
          }
        }
      }
    });

    const [productCateUpdated] = await Promise.all([
      this.productCategoryRepo.save(exist),
      this.productCategorySlugHistoryRepo.save(dataSaveSlugHistories),
    ]);
    return productCateUpdated;
  }

  async remove(id: number) {
    const exist = await this.findOne(id);
    await this.productCategoryRepo.remove(exist);
    return 'remove success';
  }

  async removeMulti(ids: number[]) {
    await this.productCategoryRepo.delete(ids);
    return 'remove multi success';
  }

  async updateProductCategoriesDisplayOrder(
    reqData: UpdateProductCategoriesDisplayOrderDto,
  ) {
    const productCategoryIds = reqData.items.map((item) => {
      return item.id;
    });
    const productCategoriesGet = await this.productCategoryRepo.findByIds(
      productCategoryIds,
    );
    if (
      !productCategoriesGet ||
      !productCategoriesGet.length ||
      productCategoryIds.length != productCategoriesGet.length
    ) {
      throw new BadRequestExc('Không thể cập nhật');
    }
    await this.productCategoryRepo.save(reqData.items);
    return 'ok';
  }

  private async generateContentsTranslateIncludeSlugs(
    contentsTranslate: any[],
    idNewsUpdating = 0,
  ) {
    const productCategoryTranslateDataByLanguageCode: any = {};
    const newContentTranslate: any[] = [];
    contentsTranslate.forEach((item) => {
      if (
        false ==
        productCategoryTranslateDataByLanguageCode.hasOwnProperty(
          item.language_code,
        )
      ) {
        productCategoryTranslateDataByLanguageCode[item.language_code] = {
          name: '',
          slug: '',
        };
      }
      if ('name' == item.language_field) {
        productCategoryTranslateDataByLanguageCode[item.language_code]['name'] =
          item.language_value;
      }
      if ('slug' == item.language_field) {
        productCategoryTranslateDataByLanguageCode[item.language_code]['slug'] =
          item.language_value;
      }
      if ('slug' != item.language_field) {
        newContentTranslate.push(item);
      }
    });
    const objectSlugs: any = {};
    for (const langCode in productCategoryTranslateDataByLanguageCode) {
      if (
        true ==
        productCategoryTranslateDataByLanguageCode.hasOwnProperty(langCode)
      ) {
        const productCategoryTranslateData =
          productCategoryTranslateDataByLanguageCode[langCode];
        const newsSlug = await this.generateSlug(
          productCategoryTranslateData['name'],
          langCode,
          productCategoryTranslateData['slug'],
          idNewsUpdating,
        );
        if (!newsSlug) {
          return [];
        }
        // Check duplicate slug
        if (true == objectSlugs.hasOwnProperty(newsSlug)) {
          return [];
        }
        objectSlugs[newsSlug] = 1;

        newContentTranslate.push({
          language_field: 'slug',
          language_code: langCode,
          language_value: newsSlug,
        });
      }
    }

    return newContentTranslate;
  }

  private async generateSlug(name, langCode, slug = '', idNewsUpdating = 0) {
    if (!name || !langCode) {
      return '';
    }
    // TODO: cần có giải pháp để xử lý việc khi chỉnh sửa 1 tin tức thì 2 slug anh - việt bị hoán đổi cho nhau
    // TODO: khi đó thì không cần thiết phải đếm số lượng slug đang có
    if (!slug) {
      slug = this.slugService.slug(name);
    } else {
      slug = this.slugService.slug(slug);
    }
    let parameters: any = {
      language_field: 'slug',
      language_value: `${slug}%`,
    };
    let queryCountNumSlugs = this.productCategoryTransRepo
      .createQueryBuilder('product_category_translate')
      .where(
        'language_field = :language_field AND language_value LIKE :language_value',
      );
    if (idNewsUpdating) {
      parameters = {
        ...parameters,
        product_category: idNewsUpdating,
        language_code: langCode,
      };
      const queryExcludeIdUpdating = this.productCategoryTransRepo
        .createQueryBuilder('product_category_translate')
        .select('id')
        .where(
          'product_category = :product_category AND language_code = :language_code',
        );
      queryCountNumSlugs = queryCountNumSlugs.andWhere(
        `id NOT IN (${queryExcludeIdUpdating.getQuery()})`,
      );
    }
    queryCountNumSlugs = queryCountNumSlugs.setParameters(parameters);
    const numSlugs = await queryCountNumSlugs.getCount();

    if (numSlugs) {
      slug = slug + `-${numSlugs + 1}`;
    }

    return slug;
  }
}
