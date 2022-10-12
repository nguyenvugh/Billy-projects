import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiConsumes,
  ApiOperation,
} from '@nestjs/swagger';
import { PrefixServiceEnum } from '../../../common/constants/global.constant';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import {
  ManualSerialize,
  Serialize,
} from '../../../common/interceptors/serialize.interceptor';
import { GetCbiUsersDto } from './dto/request/get-cbi-users.dto';
import { AdminGetCbiUsersResult } from './dto/response/admin-get-cbi-users-result.dto';
import { AdminService } from './admin.service';

@Controller(`${PrefixServiceEnum.ADMIN}/cbi-users`)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Admin manage cbi users')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  /*
  @Get(':cbi_user_id/levels/:cbi_user_level_id')
  @ManualSerialize(AdminGetCbiLevelGroupsCbiUserLevelSubmittedResultDto)
  @ApiOperation({ summary: 'Get detail cbi user level submitted' })
  @ApiOkResponse({ type: AdminGetCbiLevelGroupsCbiUserLevelSubmittedResultDto })
  async getCbiUserLevel(
    @Param('cbi_user_id') cbiUserId: string,
    @Param('cbi_user_level_id') cbiUserLevelId: string,
  ) {
    return;
  }

  @Patch(':cbi_user_id/levels/:cbi_user_level_id')
  ///@ManualSerialize(AdminGetCbiLevelsResultDto)
  @ApiOperation({ summary: 'Confirm cbi user level submitted' })
  //@ApiOkResponse({ type: AdminGetCbiLevelsResultDto })
  async confirmCbiUserLevel(
    @Param('cbi_user_id') cbiUserId: string,
    @Param('cbi_user_level_id') cbiUserLevelId: string,
    @Body() data: ConfirmOneCbiUserLevelAnswerDto,
  ) {
    return;
  }
  */
}
