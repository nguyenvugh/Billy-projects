import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CustomerFindAllProductCombosDto } from './dto/find-all-product-combos.dto';
import { FindOneProductComboDto } from './dto/find-one-product-combo.dto';
import { ProductComboService } from './product-combo.service';

@Controller('product-combo')
export class ProductComboController {
  constructor(private readonly productComboService: ProductComboService) {}

  @MessagePattern('customer-product-combo-find-all-product-combos')
  async findAllProductCombos(reqData: CustomerFindAllProductCombosDto) {
    return await this.productComboService.findAllProductCombos(reqData);
  }

  @MessagePattern('customer-product-combo-find-one-product-combo')
  async findOneProductCombo(reqData: FindOneProductComboDto) {
    return await this.productComboService.findOneProductCombo(reqData);
  }
}
