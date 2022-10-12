import { Module } from '@nestjs/common';
import { MicroserviceModule } from '../microservice/microservice.module';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  imports: [MicroserviceModule],
  controllers: [NewsController],
  providers: [NewsService]
})
export class NewsModule { }
