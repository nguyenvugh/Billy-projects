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
import { GetCbiUserLevelsDto } from './dto/request/get-cbi-user-levels.dto';
import { GetCbiUserLevelsNeedConfirmScoreDto } from './dto/request/get-cbi-user-levels-need-confirm-score.dto';
import { ConfirmScoreOneCbiUserLevelAnswerDto } from './dto/request/confirm-score-one-cbi-user-level-answer.dto';
import { GetCbiLevelGroupsCbiUserLevelSubmittedResultDto } from './dto/response/get-cbi-user-levels-need-confirm-score-result.dto';
import { GetCbiUserLevelsResultDto } from './dto/response/get-cbi-user-levels-result.dto';
import { AdminGetCbiLevelGroupsCbiUserLevelResultDto } from './dto/response/admin-get-cbi-level-groups-cbi-user-level-result.dto';
import { AdminService } from './admin.service';

@Controller(`${PrefixServiceEnum.ADMIN}/cbi-user-levels`)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Admin manage cbi user levels')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('need-confirm-score')
  @ManualSerialize(GetCbiLevelGroupsCbiUserLevelSubmittedResultDto)
  @ApiOperation({
    summary: 'Manage cbi user levels submitted that need confirm score',
  })
  @ApiOkResponse({ type: GetCbiLevelGroupsCbiUserLevelSubmittedResultDto })
  async getCbiUserLevelsNeedConfirmScore(
    @Query() params: GetCbiUserLevelsNeedConfirmScoreDto,
  ) {
    return await this.adminService.getCbiUserLevelsNeedConfirmScore(params);
  }

  @Get('need-confirm-score/:id')
  @ManualSerialize(AdminGetCbiLevelGroupsCbiUserLevelResultDto)
  @ApiOperation({
    summary: 'Get detail cbi user level submitted that need confirm score',
  })
  @ApiOkResponse({ type: AdminGetCbiLevelGroupsCbiUserLevelResultDto })
  async getCbiUserLevelNeedConfirmScore(@Param('id') cbiUserLevelId: string) {
    return await this.adminService.getCbiUserLevelNeedConfirmScore(
      cbiUserLevelId,
    );
  }

  @Patch('need-confirm-score/:id')
  //@ManualSerialize(AdminGetCbiLevelGroupsCbiUserLevelResultDto)
  @ApiOperation({
    summary: 'Confirm score one cbi user level submitted',
  })
  //@ApiOkResponse({ type: AdminGetCbiLevelGroupsCbiUserLevelResultDto })
  async confirmScoreOneCbiUserLevel(
    @Param('id') cbiUserLevelId: string,
    @Body() data: ConfirmScoreOneCbiUserLevelAnswerDto,
  ) {
    return await this.adminService.confirmScoreOneCbiUserLevel(
      cbiUserLevelId,
      data,
    );
  }

  @Get('')
  @ManualSerialize(GetCbiUserLevelsResultDto)
  @ApiOperation({
    summary: 'Manage cbi user levels submitted',
  })
  @ApiOkResponse({ type: GetCbiUserLevelsResultDto })
  async getCbiUserLevels(@Query() params: GetCbiUserLevelsDto) {
    return await this.adminService.getCbiUserLevels(params);
  }

  @Get(':id')
  @ManualSerialize(AdminGetCbiLevelGroupsCbiUserLevelResultDto)
  @ApiOperation({
    summary: 'Get detail cbi user level submitted',
  })
  @ApiOkResponse({ type: AdminGetCbiLevelGroupsCbiUserLevelResultDto })
  async getCbiUserLevel(@Param('id') cbiUserLevelId: string) {
    return await this.adminService.getCbiUserLevel(cbiUserLevelId);
  }
}
