import { Test, TestingModule } from '@nestjs/testing';
import { QueueSendEmailService } from './queue-send-email.service';

describe('QueueSendEmailService', () => {
  let service: QueueSendEmailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueueSendEmailService],
    }).compile();

    service = module.get<QueueSendEmailService>(QueueSendEmailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
