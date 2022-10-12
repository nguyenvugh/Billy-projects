import { Module } from '@nestjs/common';
import { MicroserviceModule } from '../microservice/microservice.module';
import { NewsCategoryController } from './news-category.controller';
import { NewsCategoryService } from './news-category.service';

@Module({
  imports: [MicroserviceModule],
  controllers: [NewsCategoryController],
  providers: [NewsCategoryService]
})
export class NewsCategoryModule { }
