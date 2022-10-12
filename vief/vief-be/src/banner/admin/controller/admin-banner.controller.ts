import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Put,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBody,
  ApiConsumes,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { ADMIN_PREFIX_API } from '../../../common/constants/admin.constant';
import { AdminAuthenticate } from '../../../common/decorators/auth.decorator';
import { ManualSerialize } from '../../../common/interceptors/serialize.interceptor';
import { GroupRequiredDto } from '../../../common/dto/req/field/group-required.dto';
import { AdminGetBannersDto } from '../dto/req/admin-get-banners.dto';
import { AdminGetBannerDto } from '../dto/req/admin-get-banner.dto';
import { AdminCreateBannersDto } from '../dto/req/admin-create-banners.dto';
import { AdminUpdateBannerDto } from '../dto/req/admin-update-banner.dto';
import { AdminSortingBannersDto } from '../dto/req/admin-sorting-banners.dto';
import { AdminCreateBannersResultDto } from '../dto/res/admin-create-banners-result.dto';
import { AdminGetBannersResultDto } from '../dto/res/admin-get-banners-result.dto';
import { AdminGetBannerDetailResultDto } from '../dto/res/admin-get-banner-detail-result.dto';
import { AdminBannerService } from '../service/admin-banner.service';

@Controller(`${ADMIN_PREFIX_API}/banners`)
@AdminAuthenticate()
// TODO: apply casl
@ApiTags('Admin Banners')
@ApiBearerAuth()
export class AdminBannerController {
  constructor(private readonly adminBannerService: AdminBannerService) {}

  @Get('')
  @ManualSerialize(AdminGetBannersResultDto)
  @ApiOperation({ summary: 'Get list banners on homepage' })
  @ApiConsumes('application/x-www-form-urlencoded')
  getBanners(@Query() req: AdminGetBannersDto) {
    return this.adminBannerService.getBanners(req);
  }

  @Post('')
  @ManualSerialize(AdminCreateBannersResultDto)
  @ApiOperation({ summary: 'Create an banner' })
  createBanners(
    @Query() req: GroupRequiredDto,
    @Body() body: AdminCreateBannersDto,
  ) {
    return this.adminBannerService.createBanners(req, body);
  }

  @Post('sorting')
  @ApiOperation({ summary: 'Sort list banners' })
  sortingBanners(
    @Query() req: AdminGetBannerDto,
    @Body() body: AdminSortingBannersDto,
  ) {
    return this.adminBannerService.sortingBanners(req, body);
  }

  @Get(':id')
  @ManualSerialize(AdminGetBannerDetailResultDto)
  @ApiOperation({ summary: 'Get detail banner on homepage' })
  @ApiConsumes('application/x-www-form-urlencoded')
  getBanner(@Param('id') id: number, @Query() req: AdminGetBannerDto) {
    return this.adminBannerService.getBanner(id, req);
  }

  @Put(':id')
  @ManualSerialize(AdminGetBannerDetailResultDto)
  @ApiOperation({ summary: 'Update an banner' })
  updateBanner(
    @Param('id') id: number,
    @Query() req: AdminGetBannerDto,
    @Body() body: AdminUpdateBannerDto,
  ) {
    return this.adminBannerService.updateBanner(id, req, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an banner' })
  deleteBanner(@Param('id') id: number, @Query() req: AdminGetBannerDto) {
    return this.adminBannerService.deleteBanner(id, req);
  }
}
