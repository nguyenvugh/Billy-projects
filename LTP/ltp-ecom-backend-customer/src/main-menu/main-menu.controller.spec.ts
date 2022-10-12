import { Test, TestingModule } from '@nestjs/testing';
import { MainMenuController } from './main-menu.controller';
import { MainMenuService } from './main-menu.service';

describe('MainMenuController', () => {
  let controller: MainMenuController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MainMenuController],
      providers: [MainMenuService],
    }).compile();

    controller = module.get<MainMenuController>(MainMenuController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
