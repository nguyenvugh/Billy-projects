import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WardService } from './ward.service';
import { WardController } from './ward.controller';
import { WardRepository } from './repository/ward.repository';

@Module({
  imports: [TypeOrmModule.forFeature([WardRepository])],
  controllers: [WardController],
  providers: [WardService],
})
export class WardModule {}
