import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UpdateOneCustomerFavouriteProductComboDto } from './dto/update-one-customer-favourite-product-combo.dto';
import { DeleteOneCustomerSpecialProductComboDto } from './dto/delete-one-customer-special-product-combo.dto';
import { DeleteAllCustomerFavouriteProductCombosDto } from './dto/delete-all-customer-favourite-product-combos.dto';
import { FindAllCustomerFavouriteProductCombosDto } from './dto/find-all-customer-favourite-product-combos.dto';
import { CustomerSpecialProductComboService } from './customer-special-product-combo.service';

@Controller('customer-special-product-combo')
export class CustomerSpecialProductComboController {
  constructor(
    private readonly customerSpecialProductComboService: CustomerSpecialProductComboService,
  ) {}

  @MessagePattern(
    'customer-customer-special-product-combo-find-all-customer-favourite-product-combos',
  )
  async findAllCustomerFavouriteProductCombos(
    reqData: FindAllCustomerFavouriteProductCombosDto,
  ) {
    return await this.customerSpecialProductComboService.findAllCustomerFavouriteProductCombos(
      reqData,
    );
  }

  @MessagePattern(
    'customer-customer-special-product-combo-update-one-customer-favourite-product-combo',
  )
  async updateOneCustomerFavouriteProduct(
    reqData: UpdateOneCustomerFavouriteProductComboDto,
  ) {
    return await this.customerSpecialProductComboService.updateOneCustomerFavouriteProductCombo(
      reqData,
    );
  }

  @MessagePattern(
    'customer-customer-special-product-combo-delete-one-customer-favourite-product-combo',
  )
  async deleteOneCustomerFavouriteProductCombo(
    reqData: DeleteOneCustomerSpecialProductComboDto,
  ) {
    return await this.customerSpecialProductComboService.deleteOneCustomerFavouriteProductCombo(
      reqData,
    );
  }

  @MessagePattern(
    'customer-customer-special-product-combo-delete-all-customer-favourite-product-combos',
  )
  async deleteAllCustomerFavouriteProductCombos(
    reqData: DeleteAllCustomerFavouriteProductCombosDto,
  ) {
    return await this.customerSpecialProductComboService.deleteAllCustomerFavouriteProductCombos(
      reqData,
    );
  }
}
