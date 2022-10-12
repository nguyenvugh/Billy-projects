import { Test, TestingModule } from '@nestjs/testing';
import { InventoryInputHistoryController } from './inventory-input-history.controller';
import { InventoryInputHistoryService } from './inventory-input-history.service';

describe('InventoryInputHistoryController', () => {
  let controller: InventoryInputHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryInputHistoryController],
      providers: [InventoryInputHistoryService],
    }).compile();

    controller = module.get<InventoryInputHistoryController>(InventoryInputHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
