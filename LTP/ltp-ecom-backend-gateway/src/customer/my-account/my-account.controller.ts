import {
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';
import { MicroserviceConsts } from '../../common/constants/microservices';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { AuthReq } from '../../common/decorators/auth-req.decorator';
import { CurrentLang } from '../../common/decorators/current-lang.decorator';
import { ListCustomerAddressesEntity } from './entities/list-customer-addresses.entity';
import { CustomerAddressEntity } from './entities/customer-address.entity';
import { CustomerProfileEntity } from './entities/customer-profile.entity';
import { ListCustomerReviewsEntity } from './entities/list-customer-reviews.entity';
import { CustomerReviewEntity } from './entities/customer-review.entity';
import { ListCustomerSpecialProductsEntity } from './entities/list-customer-special-products.entity';
import { ListCustomerSpecialProductCombosEntity } from './entities/list-customer-special-product-combos.entity';
import { ListCustomerOrdersEntity } from './entities/list-customer-orders.entity';
import { CustomerOrderEntity } from './entities/customer-order.entity';
import { CustomerOrderShippingTrackingEntity } from './entities/customer-order-shipping-tracking.entity';
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
import { CancelOneCustomerOrderDto } from './dto/cancel-one-customer-order.dto';
import { CreateOneCustomerReview } from './dto/create-one-customer-review.dto';
import { MyAccountService } from './my-account.service';

@Controller(`${MicroserviceConsts.PREFIX.CUSTOMER}/my-account`)
@UseInterceptors(ClassSerializerInterceptor)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Customer My Account')
export class MyAccountController {
  constructor(private readonly myAccountService: MyAccountService) {}

  @Get(`/addresses`)
  @ApiOperation({ summary: 'Get list addresses' })
  async getListAppNotifications(@AuthReq() authReq: any) {
    return new ListCustomerAddressesEntity(
      await this.myAccountService.findAllAddresses(authReq['id']),
    );
  }

  @Post(`/addresses`)
  @ApiOperation({ summary: 'Create one address' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async createOneCustomerAddress(
    @AuthReq() authReq: any,
    @Body() data: CustomerCreateCustomerAddressDto,
  ) {
    return new CustomerAddressEntity(
      await this.myAccountService.createOneCustomerAddress(authReq['id'], data),
    );
  }

  @Patch(`/addresses/:id`)
  @ApiOperation({ summary: 'Update one address' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async updateOneCustomerAddress(
    @AuthReq() authReq: any,
    @Param('id') id: number,
    @Body() data: CustomerUpdateCustomerAddressDto,
  ) {
    return new CustomerAddressEntity(
      await this.myAccountService.updateOneCustomerAddress(
        id,
        authReq['id'],
        data,
      ),
    );
  }

  @Delete(`/addresses/:id`)
  @ApiOperation({ summary: 'Delete one address' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async softDeleteOneCustomerAddress(
    @AuthReq() authReq: any,
    @Param('id') id: number,
  ) {
    return await this.myAccountService.softDeleteOneCustomerAddress(
      authReq['id'],
      id,
    );
  }

  @Patch(`/addresses/:id/default`)
  @ApiOperation({ summary: 'Set customer default address' })
  async setDefaultCustomerAddress(@Param('id') id: number) {
    return new CustomerAddressEntity(
      await this.myAccountService.setDefaultCustomerAddress(id),
    );
  }

  @Get(`/profile`)
  @ApiOperation({ summary: 'Get profile' })
  async getCustomerProfile(@AuthReq() authReq: any) {
    return new CustomerProfileEntity(
      await this.myAccountService.getCustomerProfile(authReq['id']),
    );
  }

  @Post(`/profile`)
  @ApiOperation({ summary: 'Update profile' })
  async updateCustomerProfile(
    @AuthReq() authReq: any,
    @Body() data: UpdateCustomerProfileDto,
  ) {
    return new CustomerProfileEntity(
      await this.myAccountService.updateCustomerProfile(authReq['id'], data),
    );
  }

  @Post(`/password`)
  @ApiOperation({ summary: 'Update password' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async updateCustomerPassword(
    @AuthReq() authReq: any,
    @Body() data: UpdateCustomerPasswordDto,
  ) {
    return new CustomerProfileEntity(
      await this.myAccountService.updateCustomerPassword(authReq['id'], data),
    );
  }

  @Post(`/social-account`)
  @ApiOperation({ summary: 'Intergrate social account' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async intergrateCustomerSocialAccount(
    @AuthReq() authReq: any,
    @Body() data: IntergrateCustomerSocialAccountDto,
  ) {
    return new CustomerProfileEntity(
      await this.myAccountService.intergrateCustomerSocialAccount(
        authReq['id'],
        data,
      ),
    );
  }

  @Get(`/reviews`)
  @ApiOperation({ summary: 'Get list reviews' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findAllReviews(
    @CurrentLang() curLang,
    @AuthReq() authReq: any,
    @Query() reqData: FindAllCustomerReviewsDto,
  ) {
    return new ListCustomerReviewsEntity(
      await this.myAccountService.findAllReviews(
        curLang,
        authReq['id'],
        reqData,
      ),
    );
  }

  @Post(`/reviews`)
  @ApiOperation({ summary: 'Create one customer review' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async createOneCustomerReview(
    @AuthReq() authReq: any,
    @Body() data: CreateOneCustomerReview,
  ) {
    return new CustomerReviewEntity(
      await this.myAccountService.createOneCustomerReview(authReq['id'], data),
    );
  }

  @Get(`/favourite-products`)
  @ApiOperation({ summary: 'Get list favourite products' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findAllCustomerFavouriteProducts(
    @CurrentLang() curLang,
    @AuthReq() authReq: any,
    @Query() reqData: FindAllCustomerFavouriteProductsDto,
  ) {
    return new ListCustomerSpecialProductsEntity(
      await this.myAccountService.findAllCustomerFavouriteProducts(
        curLang,
        authReq['id'],
        reqData,
      ),
    );
  }

  @Post(`/favourite-products`)
  @ApiOperation({ summary: 'Update one favourite product' })
  async updateOneCustomerFavouriteProduct(
    @AuthReq() authReq: any,
    @Query() reqData: UpdateOneCustomerFavouriteProductDto,
  ) {
    return await this.myAccountService.updateOneCustomerFavouriteProduct(
      authReq['id'],
      reqData,
    );
  }

  @Delete(`/favourite-products`)
  @ApiOperation({ summary: 'Delete all favourite products' })
  async deleteAllCustomerFavouriteProduct(@AuthReq() authReq: any) {
    return await this.myAccountService.deleteAllCustomerFavouriteProduct(
      authReq['id'],
    );
  }

  @Delete(`/favourite-products/:id`)
  @ApiOperation({ summary: 'Delete one favourite product' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async deleteOneCustomerFavouriteProduct(
    @AuthReq() authReq: any,
    @Param('id') id: number,
  ) {
    return await this.myAccountService.deleteOneCustomerFavouriteProduct(
      authReq['id'],
      id,
    );
  }

  @Get(`/seen-products`)
  @ApiOperation({ summary: 'Get list seen products' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findAllCustomerSeenProducts(
    @CurrentLang() curLang,
    @AuthReq() authReq: any,
    @Query() reqData: FindAllCustomerSeenProductsDto,
  ) {
    return new ListCustomerSpecialProductsEntity(
      await this.myAccountService.findAllCustomerSeenProducts(
        curLang,
        authReq['id'],
        reqData,
      ),
    );
  }

  @Get(`/favourite-product-combos`)
  @ApiOperation({ summary: 'Get list favourite product combos' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findAllCustomerFavouriteProductCombos(
    @CurrentLang() curLang,
    @AuthReq() authReq: any,
    @Query() reqData: FindAllCustomerFavouriteProductCombosDto,
  ) {
    return new ListCustomerSpecialProductCombosEntity(
      await this.myAccountService.findAllCustomerFavouriteProductCombos(
        curLang,
        authReq['id'],
        reqData,
      ),
    );
  }

  @Post(`/favourite-product-combos`)
  @ApiOperation({ summary: 'Update one favourite product combo' })
  async updateOneCustomerFavouriteProductCombo(
    @AuthReq() authReq: any,
    @Query() reqData: UpdateOneCustomerFavouriteProductComboDto,
  ) {
    return await this.myAccountService.updateOneCustomerFavouriteProductCombo(
      authReq['id'],
      reqData,
    );
  }

  @Delete(`/favourite-product-combos/:id`)
  @ApiOperation({ summary: 'Delete one favourite product combo' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async deleteOneCustomerFavouriteProductCombo(
    @AuthReq() authReq: any,
    @Param('id') id: number,
  ) {
    return await this.myAccountService.deleteOneCustomerFavouriteProductCombo(
      authReq['id'],
      id,
    );
  }

  @Delete(`/favourite-product-combos`)
  @ApiOperation({ summary: 'Delete all favourite product combos' })
  async deleteAllCustomerFavouriteProductCombo(@AuthReq() authReq: any) {
    return await this.myAccountService.deleteAllCustomerFavouriteProductCombo(
      authReq['id'],
    );
  }

  @Get(`/orders`)
  @ApiOperation({ summary: 'Get list customer orders' })
  async findAllOrders(
    @CurrentLang() curLang,
    @AuthReq() authReq: any,
    @Query() reqData: FindAllCustomerOrdersDto,
  ) {
    return new ListCustomerOrdersEntity(
      await this.myAccountService.findAllOrders(
        curLang,
        authReq['id'],
        reqData,
      ),
    );
  }

  @Get(`/orders/:id`)
  @ApiOperation({ summary: 'Get one customer order' })
  async findOneOrder(
    @CurrentLang() curLang,
    @AuthReq() authReq: any,
    @Param('id') id: number,
  ) {
    return new CustomerOrderEntity(
      await this.myAccountService.findOneOrder(curLang, authReq['id'], id),
    );
  }

  @Patch(`/orders/:id/cancel`)
  @ApiOperation({ summary: 'Cancel one customer order' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async cancelOneOrder(
    @AuthReq() authReq: any,
    @Param('id') id: number,
    @Body() reqData: CancelOneCustomerOrderDto,
  ) {
    return await this.myAccountService.cancelOneOrder(
      authReq['id'],
      id,
      reqData,
    );
  }

  @Get(`/orders/:id/shippings/:shippingId`)
  @ApiOperation({ summary: 'Get customer order shipping' })
  async getOrderShipping(
    @CurrentLang() curLang,
    @AuthReq() authReq: any,
    @Param('id') id: number,
    @Param('shippingId') shippingId: number,
  ) {
    return new CustomerOrderShippingTrackingEntity(
      await this.myAccountService.getOrderShipping(
        curLang,
        authReq['id'],
        id,
        shippingId,
      ),
    );
  }
}
