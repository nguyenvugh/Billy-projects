import { Controller } from '@nestjs/common';
import { InventoryProductService } from './inventory-product.service';

@Controller('inventory-product')
export class InventoryProductController {
  constructor(private readonly inventoryProductService: InventoryProductService) {}
}
