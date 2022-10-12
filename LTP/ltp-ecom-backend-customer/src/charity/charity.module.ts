import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from 'src/product/repository/product.repository';
import { CharityController } from './charity.controller';
import { CharityService } from './charity.service';
import { CharityProductRepository } from './repository/charity-product.repository';
import { CharityTranslateRepository } from './repository/charity-translate.repository';
import { CharityRepository } from './repository/charity.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CharityRepository,
      CharityProductRepository,
      CharityTranslateRepository,
      ProductRepository,
    ]),
  ],
  controllers: [CharityController],
  providers: [CharityService],
  exports: [CharityService],
})
export class CharityModule {}
