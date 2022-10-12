import { Module } from '@nestjs/common';
import { MicroserviceModule } from '../microservice/microservice.module';
import { NewsController } from './news.controller';
import { NewsService } from './news.service';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [MicroserviceModule],
})
export class NewsModule {}
