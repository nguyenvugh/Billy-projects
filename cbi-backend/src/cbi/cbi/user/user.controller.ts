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
import {
  ManualSerialize,
  Serialize,
} from '../../../common/interceptors/serialize.interceptor';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { GetCbisDto as UserGetCbisDto } from './dto/request/get-cbis.dto';
import { UserGetCbisResultDto } from './dto/response/user-get-cbis-result.dto';
import { User as UserEntity } from '../../../auth/entities/user.entity';
import { UserService } from './user.service';
import { UserGetCbiLevelsResultDto } from '../../cbi-level/user/dto/response/user-get-cbi-levels-result.dto';
import { UserService as CbiLevelUserService } from '../../cbi-level/user/user.service';
import { SubmitOneCbiUserLevelAnswerDto } from '../../../cbi-user/cbi-user-level/user/dto/request/submit-one-cbi-user-level-answer.dto';
import { SubmitOneCbiUserLevelAnswerResultDto } from '../../../cbi-user/cbi-user-level/user/dto/response/submit-one-cbi-user-level-answer-result.dto';
import { UserService as CbiUserLevelUserService } from '../../../cbi-user/cbi-user-level/user/user.service';
import { GetCbiLevelGroupsFullQuestionsResultDto as UserGetCbiLevelGroupsFullQuestionsResultDto } from '../../cbi-level-group/user/dto/response/get-cbi-level-groups-full-questions-result.dto';
import { UserService as CbiLevelGroupUserService } from '../../cbi-level-group/user/user.service';

@Controller(`${PrefixServiceEnum.USER}/cbis`)
@ApiTags('Show cbis on web user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private cbiLevelUserService: CbiLevelUserService,
    private cbiUserLevelUserService: CbiUserLevelUserService,
    private cbiLevelGroupUserService: CbiLevelGroupUserService,
  ) {}

  @Get()
  @ManualSerialize(UserGetCbisResultDto)
  @ApiOperation({ summary: 'Get list cbis' })
  @ApiOkResponse({ type: UserGetCbisResultDto })
  async getCbis(@Query() params: UserGetCbisDto) {
    return await this.userService.getCbis(params);
  }

  @Get('slug/:slug/levels')
  @UseGuards(JwtAuthGuard)
  @ManualSerialize(UserGetCbiLevelsResultDto)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get list cbi levels of cbi by slug' })
  @ApiOkResponse({ type: UserGetCbiLevelsResultDto })
  async getCbiLevelsOfCbiSlug(
    @Param('slug') cbiSlug: string,
    @User() user: UserEntity,
  ) {
    return await this.cbiLevelUserService.getCbiLevelsOfCbiSlug(
      cbiSlug,
      user.id,
    );
  }

  @Get('slug/:slug/levels/slug/:level_slug')
  @UseGuards(JwtAuthGuard)
  @ManualSerialize(UserGetCbiLevelGroupsFullQuestionsResultDto)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get detail of cbi level by slug' })
  @ApiOkResponse({ type: UserGetCbiLevelGroupsFullQuestionsResultDto })
  async getCbiLevelGroupsOfCbiLevelSlug(
    @Param('slug') cbiSlug: string,
    @Param('level_slug') cbiLevelSlug: string,
    @User() user: UserEntity,
  ) {
    return await this.cbiLevelGroupUserService.getCbiLevelGroupsOfCbiLevelSlug(
      cbiSlug,
      cbiLevelSlug,
      user.id,
    );
  }

  @Post('slug/:slug/levels/slug/:level_slug')
  @UseGuards(JwtAuthGuard)
  @ManualSerialize(SubmitOneCbiUserLevelAnswerResultDto)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User submit one cbi level by slug' })
  @ApiOkResponse({ type: SubmitOneCbiUserLevelAnswerResultDto })
  async submitOneCbiUserLevelAnswerByCbiSlug(
    @Param('slug') cbiSlug: string,
    @Param('level_slug') cbiLevelSlug: string,
    @Body() data: SubmitOneCbiUserLevelAnswerDto,
    @User() user: UserEntity,
  ) {
    return await this.cbiUserLevelUserService.submitOneCbiUserLevelAnswerByCbiSlug(
      cbiSlug,
      cbiLevelSlug,
      user.id,
      data,
    );
  }

  @Get(':id/levels')
  @UseGuards(JwtAuthGuard)
  @ManualSerialize(UserGetCbiLevelsResultDto)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get list cbi levels of cbi by id' })
  @ApiOkResponse({ type: UserGetCbiLevelsResultDto })
  async getCbiLevelsOfCbi(@Param('id') id: string, @User() user: UserEntity) {
    return await this.cbiLevelUserService.getCbiLevelsOfCbi(id, user.id);
  }

  @Post(':id/levels/:level_id')
  @UseGuards(JwtAuthGuard)
  @ManualSerialize(SubmitOneCbiUserLevelAnswerResultDto)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'User submit one cbi level by id' })
  @ApiOkResponse({ type: SubmitOneCbiUserLevelAnswerResultDto })
  async submitOneCbiUserLevelAnswer(
    @Param('id') id: string,
    @Param('level_id') levelId: string,
    @Body() data: SubmitOneCbiUserLevelAnswerDto,
    @User() user: UserEntity,
  ) {
    return await this.cbiUserLevelUserService.submitOneCbiUserLevelAnswer(
      id,
      levelId,
      user.id,
      data,
    );
  }

  @Get(':id/levels/:level_id')
  @UseGuards(JwtAuthGuard)
  @ManualSerialize(UserGetCbiLevelGroupsFullQuestionsResultDto)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get detail cbi level by id' })
  @ApiOkResponse({ type: UserGetCbiLevelGroupsFullQuestionsResultDto })
  async getCbiLevelGroupsOfLevel(
    @Param('id') id: string,
    @Param('level_id') levelId: string,
    @User() user: UserEntity,
  ) {
    return await this.cbiLevelGroupUserService.getCbiLevelGroupsOfLevel(
      id,
      levelId,
      user.id,
    );
  }
}
