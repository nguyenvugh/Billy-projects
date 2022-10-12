import { Controller } from '@nestjs/common';
import { InventoryInputHistoryService } from './inventory-input-history.service';

@Controller('inventory-input-history')
export class InventoryInputHistoryController {
  constructor(private readonly inventoryInputHistoryService: InventoryInputHistoryService) {}
}
