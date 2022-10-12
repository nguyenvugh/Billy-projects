import { Injectable } from '@nestjs/common';
import {
  InternalServerErrorExc,
  BadRequestExc,
} from '../../common/exceptions/custom.exception';
import { CustomerCreateCustomerAddressDto } from './dto/create-customer-address.dto';
import { CustomerUpdateCustomerAddressDto } from './dto/update-customer-address.dto';
import { UpdateCustomerProfileDto } from './dto/update-customer-profile.dto';
import { IntergrateCustomerSocialAccountDto } from './dto/intergrate-customer-social-account.dto';
import { UpdateCustomerPasswordDto } from './dto/update-customer-password.dto';
import { FindAllCustomerReviewsDto } from './dto/find-all-customer-reviews.dto';
import { FindAllCustomerFavouriteProductsDto } from './dto/find-all-customer-favourite-products.dto';
import { FindAllCustomerFavouriteProductCombosDto } from './dto/find-all-customer-favourite-product-combos.dto';
import { FindAllCustomerSeenProductsDto } from './dto/find-all-customer-seen-products.dto';
import { UpdateOneCustomerFavouriteProductDto } from './dto/update-one-customer-favourite-product.dto';
import { UpdateOneCustomerFavouriteProductComboDto } from './dto/update-one-customer-favourite-product-combo.dto';
import { FindAllCustomerOrdersDto } from './dto/find-all-customer-orders.dto';
import { CreateOneCustomerReview } from './dto/create-one-customer-review.dto';
import { CancelOneCustomerOrderDto } from './dto/cancel-one-customer-order.dto';
import { MicroserviceService } from '../microservice/microservice.service';
import {
  AuthenticateStatus,
  AuthenticateResultInterface,
} from '../services/firebase/authenticate/base.authenticate';
import { FirebaseService } from '../services/firebase/firebase.service';

@Injectable()
export class MyAccountService {
  constructor(
    private microserviceService: MicroserviceService,
    private firebaseService: FirebaseService,
  ) {}

  async findAllAddresses(customerId: number) {
    let results: any[] = [];
    if (!customerId) {
      return { results };
    }

    results = await this.microserviceService.call(
      'customer-customer-address-find-all',
      {
        customer: customerId,
      },
    );
    return { results };
  }

  async createOneCustomerAddress(
    customerId: number,
    data: CustomerCreateCustomerAddressDto,
  ) {
    return await this.microserviceService.call(
      'customer-customer-address-create-one',
      {
        ...data,
        customerId: customerId,
      },
    );
  }

  async updateOneCustomerAddress(
    id: number,
    customerId: number,
    data: CustomerUpdateCustomerAddressDto,
  ) {
    return await this.microserviceService.call(
      'customer-customer-address-update-one',
      {
        ...data,
        id: id,
        customerId: customerId,
      },
    );
  }

  async setDefaultCustomerAddress(id: number) {
    return await this.microserviceService.call(
      'customer-customer-address-set-default',
      {
        id: id,
      },
    );
  }

  async softDeleteOneCustomerAddress(customerId: number, id: number) {
    return await this.microserviceService.call(
      'customer-customer-address-delete-one',
      {
        id: id,
        customer: customerId,
      },
    );
  }

  async getCustomerProfile(customerId: number) {
    return await this.microserviceService.call(
      'customer-customer-get-customer-profile',
      {
        customer: customerId,
      },
    );
  }

  async updateCustomerProfile(
    customerId: number,
    reqData: UpdateCustomerProfileDto,
  ) {
    return await this.microserviceService.call(
      'customer-customer-update-customer-profile',
      {
        customer: customerId,
        ...reqData,
      },
    );
  }

  async updateCustomerPassword(
    customerId: number,
    reqData: UpdateCustomerPasswordDto,
  ) {
    return await this.microserviceService.call(
      'customer-customer-update-customer-password',
      {
        customer: customerId,
        ...reqData,
      },
    );
  }

  async intergrateCustomerSocialAccount(
    customerId: number,
    reqData: IntergrateCustomerSocialAccountDto,
  ) {
    const { type, uid, oauthIdToken, oauthAccessToken, action } = reqData;
    const result: AuthenticateResultInterface =
      await this.firebaseService.verifySocialAccount(type, {
        oauthIdToken,
        oauthAccessToken,
        uid,
      });
    if (AuthenticateStatus.FAIL == result.status) {
      throw new BadRequestExc();
    }

    return await this.microserviceService.call(
      'customer-customer-intergrate-customer-social-account',
      {
        customer: customerId,
        social_id: uid,
        social_type: type,
        action,
      },
    );
  }

  async findAllReviews(
    lang: string,
    customerId: number,
    reqData: FindAllCustomerReviewsDto,
  ) {
    return await this.microserviceService.call(
      'customer-customer-review-find-all-customer-reviews',
      {
        lang: lang,
        customer: customerId,
        ...reqData,
      },
    );
  }

  async createOneCustomerReview(
    customerId: number,
    data: CreateOneCustomerReview,
  ) {
    return await this.microserviceService.call(
      'customer-customer-review-create-one-customer-review',
      {
        ...data,
        customer_id: customerId,
      },
    );
  }

  async findAllCustomerFavouriteProducts(
    lang: string,
    customerId: number,
    reqData: FindAllCustomerFavouriteProductsDto,
  ) {
    return await this.microserviceService.call(
      'customer-customer-special-product-find-all-customer-favourite-products',
      {
        lang: lang,
        customer: customerId,
        ...reqData,
      },
    );
  }

  async findAllCustomerFavouriteProductCombos(
    lang: string,
    customerId: number,
    reqData: FindAllCustomerFavouriteProductCombosDto,
  ) {
    return await this.microserviceService.call(
      'customer-customer-special-product-combo-find-all-customer-favourite-product-combos',
      {
        lang: lang,
        customer: customerId,
        ...reqData,
      },
    );
  }

  async deleteOneCustomerFavouriteProduct(customerId: number, id: number) {
    return await this.microserviceService.call(
      'customer-customer-special-product-delete-one-customer-favourite-product',
      {
        id: id,
        customer: customerId,
      },
    );
  }

  async deleteOneCustomerFavouriteProductCombo(customerId: number, id: number) {
    return await this.microserviceService.call(
      'customer-customer-special-product-combo-delete-one-customer-favourite-product-combo',
      {
        id: id,
        customer: customerId,
      },
    );
  }

  async deleteAllCustomerFavouriteProduct(customerId: number) {
    return await this.microserviceService.call(
      'customer-customer-special-product-delete-all-customer-favourite-products',
      {
        customer: customerId,
      },
    );
  }

  async deleteAllCustomerFavouriteProductCombo(customerId: number) {
    return await this.microserviceService.call(
      'customer-customer-special-product-combo-delete-all-customer-favourite-product-combos',
      {
        customer: customerId,
      },
    );
  }

  async updateOneCustomerFavouriteProduct(
    customerId: number,
    reqData: UpdateOneCustomerFavouriteProductDto,
  ) {
    return await this.microserviceService.call(
      'customer-customer-special-product-update-one-customer-favourite-product',
      {
        ...reqData,
        customer: customerId,
      },
    );
  }

  async updateOneCustomerFavouriteProductCombo(
    customerId: number,
    reqData: UpdateOneCustomerFavouriteProductComboDto,
  ) {
    return await this.microserviceService.call(
      'customer-customer-special-product-combo-update-one-customer-favourite-product-combo',
      {
        ...reqData,
        customer: customerId,
      },
    );
  }

  async findAllCustomerSeenProducts(
    lang: string,
    customerId: number,
    reqData: FindAllCustomerSeenProductsDto,
  ) {
    return await this.microserviceService.call(
      'customer-customer-special-product-find-all-customer-seen-products',
      {
        lang: lang,
        customer: customerId,
        ...reqData,
      },
    );
  }

  async findAllOrders(
    curLang: string,
    customerId: number,
    reqData: FindAllCustomerOrdersDto,
  ) {
    return await this.microserviceService.call(
      'customer-order-find-all-orders',
      {
        lang: curLang,
        customer: customerId,
        ...reqData,
      },
    );
  }

  async findOneOrder(curLang: string, customerId: number, id: number) {
    return await this.microserviceService.call(
      'customer-order-find-one-order',
      {
        lang: curLang,
        customer: customerId,
        id,
      },
    );
  }

  async getOrderShipping(
    curLang: string,
    customerId: number,
    orderId: number,
    id: number,
  ) {
    return await this.microserviceService.call(
      'customer-order-shipping-get-order-shipping',
      {
        lang: curLang,
        customer: customerId,
        order_id: orderId,
        id,
      },
    );
  }

  async cancelOneOrder(
    customerId: number,
    id: number,
    reqData: CancelOneCustomerOrderDto,
  ) {
    return await this.microserviceService.call(
      'customer-order-cancel-one-order',
      {
        customer: customerId,
        id,
        ...reqData,
      },
    );
  }
}
