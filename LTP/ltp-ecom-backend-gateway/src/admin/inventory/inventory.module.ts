import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { MicroserviceModule } from '../microservice/microservice.module';

@Module({
  imports: [MicroserviceModule],
  controllers: [InventoryController],
  providers: [InventoryService],
})
export class InventoryModule {}
