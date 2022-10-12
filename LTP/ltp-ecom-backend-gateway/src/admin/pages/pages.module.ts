import { Module } from '@nestjs/common';
import { MicroserviceModule } from '../microservice/microservice.module';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';

@Module({
  controllers: [PagesController],
  providers: [PagesService],
  imports: [MicroserviceModule],
})
export class PagesModule { }
