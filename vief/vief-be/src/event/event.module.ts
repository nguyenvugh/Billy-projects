import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileRepository } from '../file/file.repository';
import { FileService } from '../file/file.service';
import { UtilsModule } from '../utils-module/utils.module';
import { EventByAdminController } from './controllers/event-by-admin.controller';
import { EventByClientController } from './controllers/event-by-client.controller';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { EventTranslationRepository } from './repository/event-translation.repository';
import { EventRepository } from './repository/event.repository';
import { EventsToRegisterInfoRepository } from './repository/events-to-register-info.repository';
import { RegisterInfoRepository } from './repository/register-info.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FileRepository,
      EventTranslationRepository,
      EventRepository,
      EventsToRegisterInfoRepository,
      RegisterInfoRepository,
    ]),
    UtilsModule,
  ],
  providers: [EventService, FileService],
  controllers: [
    EventController,
    EventByAdminController,
    EventByClientController,
  ],
})
export class EventModule {}
