import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdminMicroserviceService } from './admin-microservice.service';

@Controller('admin-microservice')
export class AdminMicroserviceController {
  constructor(private readonly adminMicroService: AdminMicroserviceService) {}

  // @Post()
  // create(@Body() createAdminMicroserviceDto: CreateAdminMicroserviceDto) {
  //   return this.adminMicroService.create(createAdminMicroserviceDto);
  // }

  // @Get()
  // findAll() {
  //   return this.adminMicroService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adminMicroService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateAdminMicroserviceDto: UpdateAdminMicroserviceDto,
  // ) {
  //   return this.adminMicroService.update(+id, updateAdminMicroserviceDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.adminMicroService.remove(+id);
  // }
}
