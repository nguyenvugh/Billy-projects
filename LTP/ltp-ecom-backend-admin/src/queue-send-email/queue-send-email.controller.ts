import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '../common/guards/auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { Permissions } from '../common/decorators/permissions.decorator';
import { FindAllQueueSendEmailsDto } from './dto/find-all-queue-send-emails.dto';
import { CreateManyQueueSendEmailsDto } from './dto/create-many-queue-send-emails.dto';
import { DeleteManyQueueSendEmailsDto } from './dto/delete-many-queue-send-emails.dto';
import { QueueSendEmailService } from './queue-send-email.service';

@Controller('queue-send-email')
export class QueueSendEmailController {
  constructor(private readonly queueSendEmailService: QueueSendEmailService) {}

  @MessagePattern('admin-queue-send-email-get-list-emails-to-send')
  async getListEmailsToSend({ body }: { body: FindAllQueueSendEmailsDto }) {
    return await this.queueSendEmailService.getListEmailsToSend(body);
  }

  @MessagePattern('admin-queue-send-email-create-many')
  @UseGuards(AuthGuard, PermissionsGuard)
  @Permissions('queue_send_email')
  async createMany({ body }: { body: CreateManyQueueSendEmailsDto }) {
    return await this.queueSendEmailService.createMany(body);
  }

  @MessagePattern('admin-queue-send-email-delete-many')
  async deleteMany({ body }: { body: DeleteManyQueueSendEmailsDto }) {
    return await this.queueSendEmailService.deleteMany(body);
  }
}
