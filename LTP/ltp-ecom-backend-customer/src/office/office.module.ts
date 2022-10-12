import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OfficeService } from './office.service';
import { OfficeController } from './office.controller';
import { OfficeRepository } from './repository/office.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OfficeRepository])],
  controllers: [OfficeController],
  providers: [OfficeService],
})
export class OfficeModule {}
