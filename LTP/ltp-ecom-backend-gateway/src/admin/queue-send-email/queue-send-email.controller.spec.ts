import { Test, TestingModule } from '@nestjs/testing';
import { QueueSendEmailController } from './queue-send-email.controller';
import { QueueSendEmailService } from './queue-send-email.service';

describe('QueueSendEmailController', () => {
  let controller: QueueSendEmailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QueueSendEmailController],
      providers: [QueueSendEmailService],
    }).compile();

    controller = module.get<QueueSendEmailController>(QueueSendEmailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
