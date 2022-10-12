import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ManualSerialize } from '../../common/interceptors/serialize.interceptor';
import { BannerService } from '../banner.service';
import { CreateBannerDto } from '../dto/req/create-banner.dto';
import { GetAllBannerDto } from '../dto/req/get-all-banner.dto';
import { ResGetListBanner } from '../dto/res/get-list-banner.dto';

@Controller('admin/banners')
@ApiTags('Admin Banners')
export class BannerAdminController {
  constructor(private readonly bannerService: BannerService) {}
  @Post()
  async createBanner(@Body() banner: CreateBannerDto) {
    return this.bannerService.createBanner(banner);
  }

  @Get()
  @ManualSerialize(ResGetListBanner)
  async getAll(@Query() banner: GetAllBannerDto) {
    return this.bannerService.getAllBannerByAdmin(banner);
  }

  // @Get(':id')
  // @ManualSerialize(ResGetBanner)
  // async getBannerById(@Param('id') id: number) {
  //   return this.bannerService.getBannerById(id);
  // }

  @Delete()
  async deleteBanners(@Body('ids', ParseArrayPipe) ids: number[]) {
    return this.bannerService.deleteBanners(ids);
  }

  @Patch(':id')
  async updateBanner(@Body() banner: CreateBannerDto, @Param('id') id: number) {
    return this.bannerService.editBanner(banner, id);
  }
}
