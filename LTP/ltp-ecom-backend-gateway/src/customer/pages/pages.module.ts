import { Module } from '@nestjs/common';
import { MicroserviceModule } from '../microservice/microservice.module';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';

@Module({
  imports: [MicroserviceModule],
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule { }
