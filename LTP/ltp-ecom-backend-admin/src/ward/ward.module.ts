import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WardService } from './ward.service';
import { WardController } from './ward.controller';
import { WardRepository } from './repository/ward.repository';
import { JwtCoreModule } from '../jwt-core/jwt-core.module';

@Module({
  imports: [TypeOrmModule.forFeature([WardRepository]), JwtCoreModule],
  controllers: [WardController],
  providers: [WardService],
})
export class WardModule {}
