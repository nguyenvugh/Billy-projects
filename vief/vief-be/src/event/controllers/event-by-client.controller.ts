import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LangEnum } from '../../common/constants/global.constant';
import { ManualSerialize } from '../../common/interceptors/serialize.interceptor';
import { RegisterEventDto } from '../dto/req/client/register-event.dto';
import { ResGetDetailEventByClient } from '../dto/res/client/get-detail-event.dto';
import { EventService } from '../event.service';

@Controller('client/events')
@ApiTags('Event client')
export class EventByClientController {
  constructor(private readonly eventService: EventService) {}
  @Get(':slug')
  @ManualSerialize(ResGetDetailEventByClient)
  async getDetailEvent(
    @Param('slug') slug: string,
    @Headers('lang') lang: LangEnum,
  ) {
    return this.eventService.getDetailEventByClient(slug, lang);
  }

  @Post('/register')
  async registerEvent(@Body() registerEvent: RegisterEventDto) {
    return this.eventService.registerEvent(registerEvent);
  }
}
