import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Public } from 'src/common/decorators/public-api.decorator';
import PaginateDto from 'src/utils-module/pagination/dto/paginate.dto';
import { CreateEmailDto } from '../dto/create-emails.dto';
import { DeleteEmailDto } from '../dto/delete-emails.dto';
import { EmailsService } from '../service/emails.service';

@Controller('emails')
@ApiTags('Emails')
@UseGuards(JwtAuthGuard)
export class EmailsController {
  constructor(private readonly emailService: EmailsService) {}

  @Post()
  @Public()
  async create(@Body() email: CreateEmailDto) {
    return await this.emailService.create(email);
  }

  @Get()
  async getEmails(@Query() query: PaginateDto) {
    return await this.emailService.getEmails(query);
  }

  @Delete()
  async deleteEmails(@Query() query: DeleteEmailDto) {
    return await this.emailService.deleteEmailsByIds(query);
  }
}
