import { Module } from '@nestjs/common';
import { MainMenuService } from './main-menu.service';
import { MainMenuController } from './main-menu.controller';
import { MicroserviceModule } from '../microservice/microservice.module';

@Module({
  imports: [MicroserviceModule],
  controllers: [MainMenuController],
  providers: [MainMenuService],
})
export class MainMenuModule {}
