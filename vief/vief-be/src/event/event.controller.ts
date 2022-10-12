import { Controller, Get, Headers, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LangEnum } from '../common/constants/global.constant';
import { ManualSerialize } from '../common/interceptors/serialize.interceptor';
import { GetListEventsDto } from './dto/req/get-list-event.dto';
import { ResGetListEvent } from './dto/res/get-list-event.dto';
import { EventService } from './event.service';

@Controller('events')
@ApiTags('Events')
export class EventController {
  constructor(private readonly eventService: EventService) {}
  @Get()
  @ManualSerialize(ResGetListEvent)
  async getAll(
    @Query() getEvents: GetListEventsDto,
    @Headers('lang') lang: LangEnum,
  ) {
    return this.eventService.getListEvents(getEvents, lang);
  }
}
