import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import PaginateDto from 'src/utils-module/pagination/dto/paginate.dto';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { DeleteMultiContact } from './dto/delete-multi-contact.dto';

@Controller('contact')
@ApiTags('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Get()
  getContacts(@Query() query: PaginateDto) {
    return this.contactService.getContacts(query);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.remove(id);
  }

  @Delete()
  async deleteEmails(@Body() params: DeleteMultiContact) {
    const { ids } = params;
    return await this.contactService.removeMulti(ids);
  }
}
