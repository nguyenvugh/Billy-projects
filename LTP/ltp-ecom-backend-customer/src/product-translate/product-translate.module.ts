import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductTranslateService } from './product-translate.service';
import { ProductTranslateController } from './product-translate.controller';
import { ProductTranslateRepository } from './repository/product-translate.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductTranslateRepository])],
  controllers: [ProductTranslateController],
  providers: [ProductTranslateService],
})
export class ProductTranslateModule {}
