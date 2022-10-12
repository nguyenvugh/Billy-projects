import { Test, TestingModule } from '@nestjs/testing';
import { MyAccountController } from './my-account.controller';
import { MyAccountService } from './my-account.service';

describe('MyAccountController', () => {
  let controller: MyAccountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MyAccountController],
      providers: [MyAccountService],
    }).compile();

    controller = module.get<MyAccountController>(MyAccountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
