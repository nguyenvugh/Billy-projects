import { Test, TestingModule } from '@nestjs/testing';
import { ApiAdminController } from './api-admin.controller';
import { ApiAdminService } from './api-admin.service';

describe('ApiAdminController', () => {
  let controller: ApiAdminController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiAdminController],
      providers: [ApiAdminService],
    }).compile();

    controller = module.get<ApiAdminController>(ApiAdminController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
