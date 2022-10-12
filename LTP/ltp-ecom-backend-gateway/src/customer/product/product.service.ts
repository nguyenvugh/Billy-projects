import { Injectable } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CustomerFindAllProductsDto } from './dto/find-all-products.dto';
import { FindRelatedProductsDto } from './dto/find-related-products.dto';
import { FindOneProductDto } from './dto/find-one-product.dto';
import { CustomerFindProductReviewsDto } from './dto/find-product-reviews.dto';
import { FindSLugOtherLangDto } from './dto/find-slug-other-lang.dto';
import { MicroserviceService } from '../microservice/microservice.service';

@Injectable()
export class ProductService {
  constructor(
    private microserviceService: MicroserviceService,
    private i18n: I18nService,
  ) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(
    curLang: string,
    reqData: CustomerFindAllProductsDto,
    customer: number,
  ) {
    const finalReqData: any = {
      ...reqData,
      lang: curLang,
    };
    if (customer) {
      finalReqData['customer'] = customer;
    }
    const result = await this.microserviceService.call(
      'customer-product-find-all',
      finalReqData,
    );

    return result;
  }

  async findOne(
    id: number,
    curLang: string,
    customer: number,
    reqData: FindOneProductDto,
  ) {
    const finalReqData: any = {
      ...reqData,
      id,
      lang: curLang,
    };
    if (customer) {
      finalReqData['customer'] = customer;
    }
    const result = await this.microserviceService.call(
      'customer-product-find-one',
      finalReqData,
    );

    return result;
  }

  async findOneBySlug(slug: string, curLang: string, customer: number) {
    const finalReqData: any = {
      slug,
      lang: curLang,
    };
    if (customer) {
      finalReqData['customer'] = customer;
    }
    const result = await this.microserviceService.call(
      'customer-product-find-one-by-slug',
      finalReqData,
    );

    return result;
  }

  async findReviews(id: number, reqData: CustomerFindProductReviewsDto) {
    const result = await this.microserviceService.call(
      'customer-product-find-reviews',
      {
        ...reqData,
        product: id,
      },
    );

    return result;
  }

  async findReviewsBySlug(
    slug: string,
    curLang: string,
    reqData: CustomerFindProductReviewsDto,
  ) {
    const result = await this.microserviceService.call(
      'customer-product-find-reviews-by-slug',
      {
        ...reqData,
        slug: slug,
        lang: curLang,
      },
    );

    return result;
  }

  async findRelated(curLang: string, reqData: FindRelatedProductsDto) {
    const result = await this.microserviceService.call(
      'customer-product-find-related',
      {
        ...reqData,
        lang: curLang,
      },
    );

    return result;
  }

  async findSlugOtherLang(curLang: string, reqData: FindSLugOtherLangDto) {
    return await this.microserviceService.call(
      'customer-product-find-slug-other-lang',
      {
        lang: curLang,
        slug: reqData.slug,
        otherLang: reqData.other_lang,
      },
    );
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
