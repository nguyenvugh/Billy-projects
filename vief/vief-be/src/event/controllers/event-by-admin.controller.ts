import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ManualSerialize } from '../../common/interceptors/serialize.interceptor';
import { CreateEventDto } from '../dto/req/admin/create-event.dto';
import { DeleteEventsDto } from '../dto/req/admin/delete-event.dto';
import { EditEventDto } from '../dto/req/admin/edit-event.dto';
import { ResGetDetailEventByAdmin } from '../dto/res/admin/get-detail-event.dto';
import { ResGetRegisterByAdmin } from '../dto/res/admin/get-list-register.dto';
import { EventService } from '../event.service';

@Controller('admin/events')
@ApiTags('Event admin')
export class EventByAdminController {
  constructor(private readonly eventService: EventService) {}
  @Post()
  async createEvent(@Body() createEvent: CreateEventDto) {
    return this.eventService.createEvent(createEvent);
  }
  @Patch(':id')
  async updateEvent(@Body() editEvent: EditEventDto, @Param('id') id: number) {
    return this.eventService.editEvent(editEvent, id);
  }

  @Delete()
  async deleteEvents(@Body() { ids }: DeleteEventsDto) {
    return this.eventService.deleteEvents(ids);
  }

  @Get(':id')
  @ManualSerialize(ResGetDetailEventByAdmin)
  async getDetailEvent(@Param('id') id: number) {
    return this.eventService.getDetailEventByAdmin(id);
  }

  @Get('register/:eventId')
  @ManualSerialize(ResGetRegisterByAdmin)
  async getListRegisterByAdmin(@Param('eventId') eventId: number) {
    return this.eventService.getListRegisterByAdmin(eventId);
  }
}
