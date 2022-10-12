import { Test, TestingModule } from '@nestjs/testing';
import { MainMenuService } from './main-menu.service';

describe('MainMenuService', () => {
  let service: MainMenuService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MainMenuService],
    }).compile();

    service = module.get<MainMenuService>(MainMenuService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
