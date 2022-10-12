import {
  BooleanValue,
  DeletedConst,
  MAX_FEATURE_PRODUCT,
} from 'src/common/constants';
import { reCalculateNumberRemainProductInInventories } from '../common/helpers/product.helper';
import { convertVietnameseCharsToEnglishChars } from '../common/helpers/util.helper';
import { SlugService } from '../common/services/slug.service';
import { ProductTranslateRepo } from './repositories/product-translate.repository';
import { ProductSlugHistoryRepo } from './repositories/product-slug-history.repository';
import { ProductAttributeTranslateRepo } from './repositories/product-attribute-translate.repository';
import {
  BadRequestExc,
  ConflictExc,
} from './../common/exceptions/custom.exception';
import { Injectable } from '@nestjs/common';
import { NotFoundExc } from 'src/common/exceptions/custom.exception';
import { ProductCategoryRepository } from 'src/product-category/repositories/product-category.repository';
import {
  CreateProductAttributeTransDto,
  CreateProductDto,
} from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ConfigProductAttributeRepo } from './repositories/config-product-attribute.repository';
import { ProductRepository } from './repositories/product.repository';
import { MediaUploadRepository } from 'src/media-upload/repositories/media-upload.repository';
import { ProductCategoryService } from 'src/product-category/product-category.service';
import { MediaUploadService } from 'src/media-upload/media-upload.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Not } from 'typeorm';
import { ProductAttributeRepo } from './repositories/product-attribute.repository';
import { ProductCategoryTranslate } from 'src/product-category/schemas/product-category-translate.schema';
import { Product } from './schemas/product.schema';
import { ProductAttribute } from './schemas/product-attribute.schema';
import { ProductImageRepo } from './repositories/product-image.repository';
import { InventoryProductRepo } from 'src/inventory/repository/inventory-product.repository';
import { InventoryRepo } from 'src/inventory/repository/inventory.repository';

@Injectable()
export class ProductService {
  constructor(
    private productRepo: ProductRepository,
    private configProductAttributeRepo: ConfigProductAttributeRepo,
    private productAttributeTransRepo: ProductAttributeTranslateRepo,
    private productAttributeRepo: ProductAttributeRepo,
    private productTransRepo: ProductTranslateRepo,
    private productSlugHistoryRepo: ProductSlugHistoryRepo,
    private productImageRepo: ProductImageRepo,
    @InjectRepository(ProductCategoryRepository)
    private productCategoryRepo: ProductCategoryRepository,
    @InjectRepository(MediaUploadRepository)
    private mediaUploadRepo: MediaUploadRepository,
    @InjectRepository(InventoryProductRepo)
    private inventoryProductRepo: InventoryProductRepo,
    @InjectRepository(InventoryRepo)
    private inventoryRepo: InventoryRepo,
    private slugService: SlugService,
  ) {}

  async initSlugData() {
    const productNamesData = await this.productTransRepo.find({
      order: {
        id: 'ASC',
      },
    });
    const groupProductBySlugs: any = {};
    if (productNamesData.length) {
      productNamesData.forEach((item) => {
        const productCategorySlug = this.slugService.slug(item.name);
        if (false == groupProductBySlugs.hasOwnProperty(productCategorySlug)) {
          groupProductBySlugs[productCategorySlug] = [];
        }
        groupProductBySlugs[productCategorySlug].push(item.id);
      });
    }
    const dataInitSlug: any[] = [];
    for (const productCategorySlug in groupProductBySlugs) {
      if (true == groupProductBySlugs.hasOwnProperty(productCategorySlug)) {
        const productTranslateIds = groupProductBySlugs[productCategorySlug];
        for (let index = 0; index < productTranslateIds.length; index++) {
          const productTranslateId = productTranslateIds[index];
          dataInitSlug.push({
            id: productTranslateId,
            slug:
              0 == index
                ? productCategorySlug
                : `${productCategorySlug}-${index + 1}`,
          });
        }
      }
    }
    await this.productTransRepo.save(dataInitSlug);

    return 'success';
  }

  async createConfigProductAttribute() {
    // Add product config attribute: name, desc, short_desc
    const listAttribute = [
      {
        name: 'Name',
        identity: 'name',
      },
      {
        name: 'Description',
        identity: 'desc',
      },
      {
        name: 'Short Description',
        identity: 'short_desc',
      },
    ];

    await this.configProductAttributeRepo.insert(listAttribute);
    return 'Add product config attribute: name, desc, short_desc';
  }

  async create(createProductDto: CreateProductDto) {
    const {
      price,
      status,
      code,
      category,
      images,
      translates,
      status_display,
      is_feature,
      thumbnail,
      stock,
      length,
      width,
      height,
      weight,
      allow_cod,
    } = createProductDto;

    // Check if code or another unique is exist product.
    const existProduct = await this.productRepo.findOne({ code });
    if (existProduct) throw new ConflictExc();

    // Check if category is exist.
    const existCategory = await this.productCategoryRepo.findOne(category);
    if (!existCategory) throw new BadRequestExc();

    // get array image is exist.
    const listIdImg = images ? [...images, thumbnail] : [thumbnail];
    const existImages = await this.mediaUploadRepo.findByIds(listIdImg);

    if (existImages.length !== listIdImg.length) throw new BadRequestExc();

    if (length > 5000 || width > 5000 || height > 5000) {
      return {
        message: 'Length/Width/Height can not greater than 5000cm',
      };
    }

    if (weight > 500) {
      return {
        message: 'Weight can not greater than 500kg',
      };
    }

    const newContentsTranslate =
      await this.generateContentsTranslateIncludeSlugs(translates);
    if (!newContentsTranslate.length) {
      throw new BadRequestExc('Slug sản phẩm bị trùng!');
    }

    // Verify name exist
    const optionsFind = [];
    const translatesData = {};
    newContentsTranslate.forEach((trans) => {
      if (trans.language_field === 'name') {
        optionsFind.push({
          language_code: trans.language_code,
          name: trans.language_value,
        });
      }
      if (!translatesData[trans.language_code]) {
        translatesData[trans.language_code] = {};
      }
      translatesData[trans.language_code][trans.language_field] =
        trans.language_value;
    });
    const existName = await this.productTransRepo.findOne({
      where: optionsFind,
    });

    if (existName) throw new ConflictExc('Tên sản phẩm đã bị trùng!');

    // verify is feature
    if (is_feature === BooleanValue.TRUE) {
      const featureProducts = await this.productRepo.find({
        is_feature: BooleanValue.TRUE,
      });
      const listIds = featureProducts.map((product) => product.id);

      if (listIds.length >= MAX_FEATURE_PRODUCT) {
        throw new BadRequestExc('Số lượng Feature sản phẩm đã đủ!');
      }
    }

    const createProduct = await this.productRepo.save({
      code,
      status,
      price,
      category_obj: existCategory,
      status_display,
      is_feature,
      length,
      width,
      height,
      weight,
      allow_cod,
    });

    // Update stock in inventory id = 1.
    // Remove by congteso: Duc Pham sử dụng code sai, remove để hệ thống hoạt động
    /*const inventory = await this.inventoryRepo.findOne(1);
    await this.inventoryProductRepo.save({
      product: createProduct,
      inventory,
      remaining_number: stock,
    });*/

    const dataImg = existImages.map((img) => {
      return {
        product: createProduct,
        image: img,
        is_thumbnail:
          img.id === thumbnail ? BooleanValue.TRUE : BooleanValue.FALSE,
      };
    });

    await this.productImageRepo.save(dataImg);

    // Create name translate
    const transDto = Object.keys(translatesData).map((key) => ({
      language_code: key,
      name: translatesData[key].name,
      slug: translatesData[key].slug,
      short_desc: translatesData[key].short_desc,
      description: translatesData[key].description,
      product_obj: createProduct,
    }));

    await this.productTransRepo.save(transDto);

    // return savedProduct;
    // Call api to find one here.
    return await this.findOne(createProduct.id);
  }

  async createProductAttribute(
    name: CreateProductAttributeTransDto[],
    desc: CreateProductAttributeTransDto[],
    short_desc: CreateProductAttributeTransDto[],
    savedProduct: Product,
  ) {
    // Create product_attribute first, find attribute in config attribute: name, desc, short_desc.
    const nameConfigAttribute = await this.configProductAttributeRepo.findOne({
      identity: 'name',
    });
    const descConfigAttribute = await this.configProductAttributeRepo.findOne({
      identity: 'desc',
    });

    const shortDescConfigAttribute =
      await this.configProductAttributeRepo.findOne({
        identity: 'short_desc',
      });
    if (
      !nameConfigAttribute ||
      !descConfigAttribute ||
      !shortDescConfigAttribute
    ) {
      throw new BadRequestExc();
    }

    // let listTrans: ProductAttribute[] = [];
    // const listAttributeDto = [
    //   { data: name, configAttribute: nameConfigAttribute },
    //   { data: desc, configAttribute: descConfigAttribute },
    //   { data: short_desc, configAttribute: shortDescConfigAttribute },
    // ];

    // Create name and name translate
    const nameAttri = await this.productAttributeRepo.save({
      attribute: nameConfigAttribute,
      product: savedProduct,
    });

    const nameTransDto = name.map((trans) => ({
      ...trans,
      language_field: nameConfigAttribute.identity,
      product_attribute: nameAttri,
    }));

    await this.productAttributeTransRepo.save(nameTransDto);

    // Create desc and name translate
    const descAttri = await this.productAttributeRepo.save({
      attribute: descConfigAttribute,
      product: savedProduct,
    });

    const descTransDto = desc.map((trans) => ({
      ...trans,
      language_field: descConfigAttribute.identity,
      product_attribute: descAttri,
    }));

    await this.productAttributeTransRepo.save(descTransDto);

    // Create short_desc and name translate
    const shortDescAttri = await this.productAttributeRepo.save({
      attribute: shortDescConfigAttribute,
      product: savedProduct,
    });

    const shortDescTransDto = short_desc.map((trans) => ({
      ...trans,
      language_field: shortDescConfigAttribute.identity,
      product_attribute: shortDescAttri,
    }));

    await this.productAttributeTransRepo.save(shortDescTransDto);

    return [nameAttri, descAttri, shortDescAttri];
    // let listPromise = [];
    // listAttributeDto.forEach(async (attribute) => {
    // Create name attribute
    // const createAttribute = await this.productAttributeRepo.create({
    //   attribute: attribute.configAttribute,
    //   product: savedProduct,
    // });

    // const createdAttri = await this.productAttributeRepo.save({
    //   attribute: attribute.configAttribute,
    //   product: savedProduct,
    // });
    // // Create name attribute translates.
    // const listDto = attribute.data.map((trans) => ({
    //   ...trans,
    //   language_field: attribute.configAttribute.identity,
    //   product_attribute: createdAttri,
    // }));

    // // const listNameTransCreated =
    // await this.productAttributeTransRepo.save(listDto);

    // Save product attribute, and product attribute translate;
    // createdAttri.translates = listNameTransCreated;
    // const savedAttribute = await this.productAttributeRepo.save(createdAttri);

    // const categoryCreated = this.productAttributeRepo.manager.transaction(
    //   async () => {
    // const createdAttri = this.productAttributeRepo.save({
    //   attribute: attribute.configAttribute,
    //   product: savedProduct,
    // });

    // listPromise.push(createdAttri);

    // return createdAttri;
    //   },
    // );

    // Create name attribute translates.
    // const listDto = attribute.data.map((trans) => ({
    //   ...trans,
    //   language_field: attribute.configAttribute.identity,
    //   product_attribute: createdAttri,
    // }));

    // await this.productAttributeTransRepo.save(listDto);

    //   return 'createdAttri';
    // });

    // console.log('listPromise', listPromise);
    // const listAttribute = await Promise.all(listPromise);
    // console.log('listAttribute', listAttribute);
  }

  async findAllNew(params: FindProductDto) {
    const { page, limit, q, category, is_feature, status_display } = params;
    const skip = (page - 1) * limit;

    // Query builder for get list product
    const data = await this.productRepo.find({
      join: {
        alias: 'product',
        leftJoinAndSelect: {
          category_obj: 'product.category_obj',
          translates: 'product.translates',
          product_inventory: 'product.product_inventory',
          images: 'product.images',
        },
      },
      // relations: [
      //   'translates',
      //   'product_inventory',
      //   'category_obj',
      //   'images',
      //   'images.image',
      //   'category_obj.translates',
      // ],
    });

    // return { results, total };
    return data;
  }

  async findAll(params: FindProductDto) {
    const { page, limit, q, category, is_feature, status_display } = params;
    const skip = (page - 1) * limit;

    // console.log('params', params);

    // const qbJob = await this.productRepo
    //   .createQueryBuilder('product')
    //   .leftJoinAndSelect('product.translates', 'translate')
    //   .where('translate.language_code = :lang', { lang: 'vi' })
    //   .andWhere('translate.language_field = :field', { field: 'name' });
    // .orderBy('translate.language_value', 'DESC')
    // .take(limit)
    // .skip(skip);

    // const [results1, total1] = await qbJob.getManyAndCount();
    // return results1;
    // Query builder for get list product
    const qb = await this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category_obj', 'category_obj')
      .leftJoinAndSelect('product.product_inventory', 'product_inventory')
      .leftJoinAndSelect(
        'product_inventory.inventory',
        'product_inventory_inventory',
      )
      .leftJoinAndSelect('product.translates', 'translate')
      .leftJoinAndSelect('product.images', 'product_image')
      .leftJoinAndSelect('product_image.image', 'image')
      .leftJoin('product.translates', 'translate_filter')
      .leftJoinAndSelect('category_obj.translates', 'category_translate');

    qb.where('1 = 1');
    if (q) {
      qb.andWhere(
        'translate_filter.name LIKE :q1 OR translate_filter.short_desc LIKE :q1 OR translate_filter.description LIKE :q1',
        {
          q1: `%${q}%`,
        },
      );

      qb.orWhere('product.code LIKE :q2', {
        q2: `%${q}%`,
      });
    }

    if (category) qb.andWhere('product.category = :category', { category });
    if (is_feature)
      qb.andWhere('product.is_feature = :is_feature', { is_feature });
    if (status_display)
      qb.andWhere('product.status_display = :status_display', {
        status_display,
      });
    qb.orderBy('product.created_at', 'DESC').take(limit).skip(skip);

    let [results, total] = await Promise.all([
      qb.take(limit).skip(skip).getMany(),
      qb.getCount(),
    ]);
    results = results.map((item) => {
      item.product_inventory = reCalculateNumberRemainProductInInventories(
        item.product_inventory,
      );

      return item;
    });

    // Don't know why getMany work and get Many and count is not
    // const [results, total] = await qb.printSql().getManyAndCount();
    return { results, total };
  }

  async findOne(id: number) {
    await this.findExist(id);

    // Get data product here, join info we need.
    const product = await this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category_obj', 'category')
      .leftJoinAndSelect('product.product_inventory', 'product_inventory')
      .leftJoinAndSelect(
        'product_inventory.inventory',
        'product_inventory_inventory',
      )
      .leftJoinAndSelect('category.translates', 'category_translate')
      .leftJoinAndSelect('product.translates', 'translate')
      .leftJoinAndSelect('product.images', 'product_image')
      .leftJoinAndSelect('product_image.image', 'image')
      .where('product.id = :id', { id })
      .getOne();

    // We need to modify the data shape here, get attribute: name, short_desc, desc
    // Currenty we will not do it yet.

    product.product_inventory = reCalculateNumberRemainProductInInventories(
      product.product_inventory,
    );
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const {
      price,
      status,
      code,
      category,
      images,
      translates,
      status_display,
      is_feature,
      thumbnail,
      stock,
      length,
      width,
      height,
      weight,
      allow_cod,
    } = updateProductDto;
    delete updateProductDto.id;

    const exist = await this.productRepo.findOne(id);
    if (!exist) throw new NotFoundExc();

    let optionUpdate = {};
    // check category exist
    if (category) {
      const existCategory = await this.productCategoryRepo.findOne(category);
      if (!existCategory) throw new BadRequestExc();
      // exist.category_obj = existCategory;
      optionUpdate = {
        ...optionUpdate,
        category_obj: existCategory,
      };
    }

    // Check code is conflict
    if (code) {
      const existCode = await this.productRepo.findOne({ code });
      if (existCode) {
        if (existCode.id !== exist.id) throw new ConflictExc();
      }

      // exist.code = code;
      optionUpdate = {
        ...optionUpdate,
        code,
      };
    }

    if (length > 5000 || width > 5000 || height > 5000) {
      return {
        message: 'Length/Width/Height can not greater than 5000cm',
      };
    }

    if (weight > 500) {
      return {
        message: 'Weight can not greater than 500kg',
      };
    }

    const newContentsTranslate =
      await this.generateContentsTranslateIncludeSlugs(translates, id);
    if (!newContentsTranslate.length) {
      throw new BadRequestExc('Slug sản phẩm bị trùng!');
    }

    // Update translate
    const translatesData = {};
    const optionsFind = [];
    newContentsTranslate.forEach((trans) => {
      if (trans.language_field === 'name') {
        optionsFind.push({
          language_code: trans.language_code,
          name: trans.language_value,
        });
      }
      if (!translatesData[trans.language_code]) {
        translatesData[trans.language_code] = {};
      }
      translatesData[trans.language_code][trans.language_field] =
        trans.language_value;
    });
    const existName = await this.productTransRepo.findOne({
      where: optionsFind,
      relations: ['product_obj'],
    });

    if (existName) {
      if (existName.product_obj.id !== exist.id)
        throw new ConflictExc('Tên sản phẩm đã bị trùng!');
    }

    // verify is feature
    if (is_feature === BooleanValue.TRUE) {
      const featureProducts = await this.productRepo.find({
        is_feature: BooleanValue.TRUE,
        id: Not(exist.id),
      });

      if (featureProducts.length >= MAX_FEATURE_PRODUCT) {
        throw new BadRequestExc('Số lượng Feature sản phẩm đã đủ!');
      }
    }

    // verify images
    let listImg;
    if (images) {
      listImg = await this.mediaUploadRepo.findByIds(images);
      if (listImg.length !== images.length) throw new BadRequestExc();
    }

    // Update images if pass verify
    if (listImg) {
      // remove all images first and save new image.
      await this.productImageRepo.delete({ product: exist });
      // const existProduct = await this.productRepo.findOne(id);
      const newListImg = listImg.map((img) => {
        return {
          image: img,
          product: exist,
          is_thumbnail: -1,
        };
      });

      await this.productImageRepo.save(newListImg);
    }

    // Update translate if pass verify
    if (translates) {
      const listTrans = await this.productTransRepo.find({
        product_obj: exist,
      });

      const dataSaveSlugHistories: any[] = [];
      const updateTrans = listTrans.map((trans) => {
        if (true == translatesData.hasOwnProperty(trans.language_code)) {
          if (trans.slug != translatesData[trans.language_code].slug) {
            dataSaveSlugHistories.push({
              product_id: id,
              language_code: trans.language_code,
              slug: trans.slug,
            });
          }
        }

        return {
          ...trans,
          language_code: trans.language_code,
          name: translatesData[trans.language_code].name || trans.name,
          slug: translatesData[trans.language_code].slug || trans.slug,
          short_desc:
            translatesData[trans.language_code].short_desc || trans.short_desc,
          description:
            translatesData[trans.language_code].description ||
            trans.description,
        };
      });

      // console.log('updateTrans', updateTrans);
      await Promise.all([
        this.productTransRepo.save(updateTrans),
        this.productSlugHistoryRepo.save(dataSaveSlugHistories),
      ]);
    }

    if (thumbnail) {
      const updateImg = await this.mediaUploadRepo.findOne(thumbnail);
      const existThumbnail = await this.productImageRepo.findOne({
        is_thumbnail: BooleanValue.TRUE,
        product: exist,
      });

      if (existThumbnail) {
        await this.productImageRepo.save({
          ...existThumbnail,
          image: updateImg,
        });
      } else {
        const newThumbnail = {
          image: updateImg,
          product: exist,
          is_thumbnail: 1,
        };

        await this.productImageRepo.save(newThumbnail);
      }
    }

    /*
    if (stock) {
      // Update stock in inventory id = 1.
      const inventory = await this.inventoryRepo.findOne(1);
      const inventoryProduct = await this.inventoryProductRepo.findOne({
        inventory,
        product: exist,
      });
      if (inventoryProduct) {
        await this.inventoryProductRepo.update(inventoryProduct.id, {
          product: exist,
          inventory,
          remaining_number: stock,
        });
      }
    }
    */

    // delete exist.images;
    await this.productRepo.update(exist.id, {
      ...optionUpdate,
      ...(status_display && { status_display }),
      ...(is_feature && { is_feature }),
      ...(price && { price }),
      ...(status && { status }),
      ...(length && { length }),
      ...(width && { width }),
      ...(height && { height }),
      ...(weight && { weight }),
      ...(allow_cod && { allow_cod }),
    });

    return this.findOne(exist.id);
  }

  async findExist(id: number) {
    const exist = await this.productRepo.findOne(id);
    if (!exist) throw new NotFoundExc();

    return exist;
  }

  async remove(id: number) {
    const exist = await this.findExist(id);
    // await this.productRepo.remove(exist);
    exist.deleted_at = new Date();
    exist.deleted = DeletedConst.DELETED;
    await this.productRepo.save(exist);
    return 'remove success';
  }

  async removeMulti(ids: number[]) {
    const exists = await this.productRepo.findByIds(ids);
    // await this.productRepo.remove(exists);
    // await this.productRepo.delete(ids);
    if (exists && exists.length > 0) {
      exists.map(async (item) => {
        item.deleted_at = new Date();
        item.deleted = DeletedConst.DELETED;
        await this.productRepo.save(item);
      });
    }
    return 'remove multi success';
  }

  private async generateContentsTranslateIncludeSlugs(
    contentsTranslate: any[],
    idProductUpdating = 0,
  ) {
    const productTranslateDataByLanguageCode: any = {};
    const newContentTranslate: any[] = [];
    contentsTranslate.forEach((item) => {
      if (
        false ==
        productTranslateDataByLanguageCode.hasOwnProperty(item.language_code)
      ) {
        productTranslateDataByLanguageCode[item.language_code] = {
          name: '',
          slug: '',
        };
      }
      if ('name' == item.language_field) {
        productTranslateDataByLanguageCode[item.language_code]['name'] =
          item.language_value;
      }
      if ('slug' == item.language_field) {
        productTranslateDataByLanguageCode[item.language_code]['slug'] =
          item.language_value;
      }
      if ('slug' != item.language_field) {
        newContentTranslate.push(item);
      }
    });
    const objectSlugs: any = {};
    for (const langCode in productTranslateDataByLanguageCode) {
      if (true == productTranslateDataByLanguageCode.hasOwnProperty(langCode)) {
        const productTranslateData =
          productTranslateDataByLanguageCode[langCode];
        const newsSlug = await this.generateSlug(
          productTranslateData['name'],
          langCode,
          productTranslateData['slug'],
          idProductUpdating,
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

  private async generateSlug(name, langCode, slug = '', idProductUpdating = 0) {
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
      slug: `${slug}%`,
    };
    let queryCountNumSlugs = this.productTransRepo
      .createQueryBuilder('product_translate')
      .where('slug LIKE :slug');
    if (idProductUpdating) {
      parameters = {
        ...parameters,
        product: idProductUpdating,
        language_code: langCode,
      };
      const queryExcludeIdUpdating = this.productTransRepo
        .createQueryBuilder('product_translate')
        .select('id')
        .where('product = :product AND language_code = :language_code');
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
