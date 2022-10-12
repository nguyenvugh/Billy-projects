import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FindAllCustomerFavouriteProductsDto } from './dto/find-all-customer-favourite-products.dto';
import { DeleteOneCustomerSpecialProductDto } from './dto/delete-one-customer-special-product.dto';
import { DeleteAllCustomerFavouriteProductsDto } from './dto/delete-all-customer-favourite-products.dto';
import { FindAllCustomerSeenProductsDto } from './dto/find-all-customer-seen-products.dto';
import { UpdateOneCustomerFavouriteProductDto } from './dto/update-one-customer-favourite-product.dto';
import { CustomerSpecialProductService } from './customer-special-product.service';

@Controller('customer-special-product')
export class CustomerSpecialProductController {
  constructor(
    private readonly customerSpecialProductService: CustomerSpecialProductService,
  ) {}

  @MessagePattern(
    'customer-customer-special-product-find-all-customer-favourite-products',
  )
  async findAllCustomerFavouriteProducts(
    reqData: FindAllCustomerFavouriteProductsDto,
  ) {
    return await this.customerSpecialProductService.findAllCustomerFavouriteProducts(
      reqData,
    );
  }

  @MessagePattern(
    'customer-customer-special-product-delete-one-customer-favourite-product',
  )
  async deleteOneCustomerFavouriteProduct(
    reqData: DeleteOneCustomerSpecialProductDto,
  ) {
    return await this.customerSpecialProductService.deleteOneCustomerFavouriteProduct(
      reqData,
    );
  }

  @MessagePattern(
    'customer-customer-special-product-delete-all-customer-favourite-products',
  )
  async deleteAllCustomerFavouriteProducts(
    reqData: DeleteAllCustomerFavouriteProductsDto,
  ) {
    return await this.customerSpecialProductService.deleteAllCustomerFavouriteProducts(
      reqData,
    );
  }

  @MessagePattern(
    'customer-customer-special-product-update-one-customer-favourite-product',
  )
  async updateOneCustomerFavouriteProduct(
    reqData: UpdateOneCustomerFavouriteProductDto,
  ) {
    return await this.customerSpecialProductService.updateOneCustomerFavouriteProduct(
      reqData,
    );
  }

  @MessagePattern(
    'customer-customer-special-product-find-all-customer-seen-products',
  )
  async findAllCustomerSeenProducts(reqData: FindAllCustomerSeenProductsDto) {
    return await this.customerSpecialProductService.findAllCustomerSeenProducts(
      reqData,
    );
  }
}
