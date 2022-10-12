import { Test, TestingModule } from '@nestjs/testing';
import { InventoryInputHistoryService } from './inventory-input-history.service';

describe('InventoryInputHistoryService', () => {
  let service: InventoryInputHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryInputHistoryService],
    }).compile();

    service = module.get<InventoryInputHistoryService>(InventoryInputHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
