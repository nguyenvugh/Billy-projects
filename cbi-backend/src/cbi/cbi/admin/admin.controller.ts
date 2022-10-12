import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { PrefixServiceEnum } from '../../../common/constants/global.constant';
import { ManualSerialize } from '../../../common/interceptors/serialize.interceptor';
import { AdminService as CbiLevelGroupAdminService } from '../../cbi-level-group/admin/admin.service';
import { CreateOneCbiLevelGroupDto } from '../../cbi-level-group/admin/dto/request/create-one-cbi-level-group.dto';
import { ReOrderCbiLevelGroupsDto } from '../../cbi-level-group/admin/dto/request/re-order-cbi-level-groups.dto';
import { UpdateOneCbiLevelGroupDto } from '../../cbi-level-group/admin/dto/request/update-one-cbi-level-group.dto';
import { GetCbiLevelGroupResultDto as AdminGetCbiLevelGroupResultDto } from '../../cbi-level-group/admin/dto/response/get-cbi-level-group-result.dto';
import { GetCbiLevelGroupsFullQuestionsResultDto as AdminGetCbiLevelGroupsFullQuestionsResultDto } from '../../cbi-level-group/admin/dto/response/get-cbi-level-groups-full-questions-result.dto';
import { AdminService as CbiLevelAdminService } from '../../cbi-level/admin/admin.service';
import { CreateOneCbiLevelDto } from '../../cbi-level/admin/dto/request/create-one-cbi-level.dto';
import { GetCbiLevelsDto as AdminGetCbiLevelsDto } from '../../cbi-level/admin/dto/request/get-cbi-levels.dto';
import { ReOrderCbiLevelsDto } from '../../cbi-level/admin/dto/request/re-order-cbi-levels.dto';
import { UpdateOneCbiLevelDto } from '../../cbi-level/admin/dto/request/update-one-cbi-level.dto';
import { GetCbiLevelResultDto as AdminGetCbiLevelResultDto } from '../../cbi-level/admin/dto/response/get-cbi-level-result.dto';
import { GetCbiLevelsResultDto as AdminGetCbiLevelsResultDto } from '../../cbi-level/admin/dto/response/get-cbi-levels-result.dto';
import { AdminService as CbiQuestionAdminService } from '../../cbi-question/admin/admin.service';
import { CreateOneCbiQuestionDto } from '../../cbi-question/admin/dto/request/create-one-cbi-question.dto';
import { ReOrderCbiQuestionsDto } from '../../cbi-question/admin/dto/request/re-order-cbi-questions.dto';
import { UpdateOneCbiQuestionDto } from '../../cbi-question/admin/dto/request/update-one-cbi-question.dto';
import { GetCbiQuestionResultDto as AdminGetCbiQuestionResultDto } from '../../cbi-question/admin/dto/response/get-cbi-question-result.dto';
import { AdminService } from './admin.service';
import { CreateOneCbiDto } from './dto/request/create-one-cbi.dto';
import { DeleteMultiCbisDto } from './dto/request/delete-multi-cbis.dto';
import { GetCbisDto as AdminGetCbisDto } from './dto/request/get-cbis.dto';
import { UpdateOneCbiDto } from './dto/request/update-one-cbi.dto';
import { GetCbiResultDto as AdminGetCbiResultDto } from './dto/response/get-cbi-result.dto';
import { GetCbisResultDto as AdminGetCbisResultDto } from './dto/response/get-cbis-result.dto';

@Controller(`${PrefixServiceEnum.ADMIN}/cbis`)
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Admin manage cbis')
export class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private cbiLevelAdminService: CbiLevelAdminService,
    private cbiLevelGroupAdminService: CbiLevelGroupAdminService,
    private cbiQuestionAdminService: CbiQuestionAdminService,
  ) {}

  @Get('add-slug-to-missing-data')
  @ApiOperation({ summary: 'Add slug to cbis that missing slug' })
  async addSlugToMissingData() {
    return await this.adminService.addSlugToMissingData();
  }

  @Get()
  @ManualSerialize(AdminGetCbisResultDto)
  @ApiOperation({ summary: 'Manage list cbis' })
  @ApiOkResponse({ type: AdminGetCbisResultDto })
  async getCbis(@Query() params: AdminGetCbisDto) {
    return await this.adminService.getCbis(params);
  }

  @Post()
  @ManualSerialize(AdminGetCbiResultDto)
  @ApiOperation({ summary: 'Create one cbi' })
  @ApiOkResponse({ type: AdminGetCbiResultDto })
  async createOneCbi(@Body() data: CreateOneCbiDto) {
    return await this.adminService.createOneCbi(data);
  }

  @Patch(':id')
  @ManualSerialize(AdminGetCbiResultDto)
  @ApiOperation({ summary: 'Update one cbi' })
  @ApiOkResponse({ type: AdminGetCbiResultDto })
  async updateOneCbi(@Param('id') id: string, @Body() data: UpdateOneCbiDto) {
    return await this.adminService.updateOneCbi(id, data);
  }

  @Delete(`:id`)
  @ApiOperation({ summary: 'Delete one cbi' })
  async deleteOneCbi(@Param('id') id: string) {
    return await this.adminService.deleteOneCbi(id);
  }

  @Delete(``)
  @ApiOperation({ summary: 'Delete multi cbis' })
  async deleteMultiCbi(@Body() data: DeleteMultiCbisDto) {
    return await this.adminService.deleteMultiCbi(data);
  }

  @Get('levels/add-slug-to-missing-data')
  @ApiOperation({ summary: 'Add slug to cbi levels that missing slug' })
  async addSlugToMissingCbiLevelData() {
    return await this.cbiLevelAdminService.addSlugToMissingData();
  }

  @Get(':id/levels')
  @ManualSerialize(AdminGetCbiLevelsResultDto)
  @ApiOperation({ summary: 'Manage list cbi levels' })
  @ApiOkResponse({ type: AdminGetCbiLevelsResultDto })
  async getCbiLevels(
    @Param('id') id: string,
    @Query() params: AdminGetCbiLevelsDto,
  ) {
    return await this.cbiLevelAdminService.getCbiLevelsOfCbi(id, params);
  }

  @Post(':id/levels')
  @ManualSerialize(AdminGetCbiLevelResultDto)
  @ApiOperation({ summary: 'Create one cbi level' })
  @ApiOkResponse({ type: AdminGetCbiLevelResultDto })
  async createOneCbiLevel(
    @Param('id') id: string,
    @Body() data: CreateOneCbiLevelDto,
  ) {
    return await this.cbiLevelAdminService.createOneCbiLevel(id, data);
  }

  @Post(`:id/levels/ordering`)
  @ApiOperation({ summary: 'Re order cbi levels' })
  async reOrderCbiLevels(
    @Param('id') id: string,
    @Body() data: ReOrderCbiLevelsDto,
  ) {
    return await this.cbiLevelAdminService.reOrderCbiLevels(id, data);
  }

  @Patch(':id/levels/:level_id')
  @ManualSerialize(AdminGetCbiLevelResultDto)
  @ApiOperation({ summary: 'Update one cbi level' })
  @ApiOkResponse({ type: AdminGetCbiLevelResultDto })
  async updateOneCbiLevel(
    @Param('id') id: string,
    @Param('level_id') levelId: string,
    @Body() data: UpdateOneCbiLevelDto,
  ) {
    return await this.cbiLevelAdminService.updateOneCbiLevel(id, levelId, data);
  }

  @Delete(`:id/levels/:level_id`)
  @ApiOperation({ summary: 'Delete one cbi level' })
  async deleteOneCbiLevel(
    @Param('id') id: string,
    @Param('level_id') levelId: string,
  ) {
    return await this.cbiLevelAdminService.deleteOneCbiLevel(id, levelId);
  }

  @Get(':id/levels/:level_id/groups')
  @ManualSerialize(AdminGetCbiLevelGroupsFullQuestionsResultDto)
  @ApiOperation({ summary: 'Manage list cbi level groups' })
  @ApiOkResponse({ type: AdminGetCbiLevelGroupsFullQuestionsResultDto })
  async getCbiLevelGroups(
    @Param('id') id: string,
    @Param('level_id') levelId: string,
  ) {
    return await this.cbiLevelGroupAdminService.getCbiLevelGroupsOfLevel(
      levelId,
    );
  }

  @Post(':id/levels/:level_id/groups')
  @ManualSerialize(AdminGetCbiLevelGroupResultDto)
  @ApiOperation({ summary: 'Create one cbi level group' })
  @ApiOkResponse({ type: AdminGetCbiLevelGroupResultDto })
  async createOneCbiLevelGroup(
    @Param('id') id: string,
    @Param('level_id') levelId: string,
    @Body() data: CreateOneCbiLevelGroupDto,
  ) {
    return await this.cbiLevelGroupAdminService.createOneCbiLevelGroup(
      levelId,
      data,
    );
  }

  @Post(`:id/levels/:level_id/groups/ordering`)
  @ApiOperation({ summary: 'Re order cbi level groups' })
  async reOrderCbiLevelGroups(
    @Param('id') id: string,
    @Param('level_id') levelId: string,
    @Body() data: ReOrderCbiLevelGroupsDto,
  ) {
    return await this.cbiLevelGroupAdminService.reOrderCbiLevelGroups(
      levelId,
      data,
    );
  }

  @Patch(':id/levels/:level_id/groups/:group_id')
  @ManualSerialize(AdminGetCbiLevelGroupResultDto)
  @ApiOperation({ summary: 'Update one cbi level group' })
  @ApiOkResponse({ type: AdminGetCbiLevelGroupResultDto })
  async updateOneCbiLevelGroup(
    @Param('id') id: string,
    @Param('level_id') levelId: string,
    @Param('group_id') groupId: string,
    @Body() data: UpdateOneCbiLevelGroupDto,
  ) {
    return await this.cbiLevelGroupAdminService.updateOneCbiLevelGroup(
      levelId,
      groupId,
      data,
    );
  }

  @Delete(`:id/levels/:level_id/groups/:group_id`)
  @ApiOperation({ summary: 'Delete one cbi level group' })
  async deleteOneCbiLevelGroup(
    @Param('id') id: string,
    @Param('level_id') levelId: string,
    @Param('group_id') groupId: string,
  ) {
    return await this.cbiLevelGroupAdminService.deleteOneCbiLevelGroup(
      levelId,
      groupId,
    );
  }

  @Post(':id/levels/:level_id/groups/:group_id/questions')
  @ManualSerialize(AdminGetCbiQuestionResultDto)
  @ApiOperation({ summary: 'Create one cbi question' })
  @ApiOkResponse({ type: AdminGetCbiQuestionResultDto })
  async createOneCbiLevelGroupQuestion(
    @Param('id') id: string,
    @Param('level_id') levelId: string,
    @Param('group_id') groupId: string,
    @Body() data: CreateOneCbiQuestionDto,
  ) {
    return await this.cbiQuestionAdminService.createOneCbiQuestion(
      groupId,
      data,
    );
  }

  @Post(`:id/levels/:level_id/groups/:group_id/questions/ordering`)
  @ApiOperation({ summary: 'Re order cbi questions' })
  async reOrderCbiQuestions(
    @Param('id') id: string,
    @Param('level_id') levelId: string,
    @Param('group_id') groupId: string,
    @Body() data: ReOrderCbiQuestionsDto,
  ) {
    return await this.cbiQuestionAdminService.reOrderCbiQuestions(
      groupId,
      data,
    );
  }

  @Patch(':id/levels/:level_id/groups/:group_id/questions/:question_id')
  @ManualSerialize(AdminGetCbiQuestionResultDto)
  @ApiOperation({ summary: 'Update one cbi question' })
  @ApiOkResponse({ type: AdminGetCbiQuestionResultDto })
  async updateOneCbiLevelGroupQuestion(
    @Param('id') id: string,
    @Param('level_id') levelId: string,
    @Param('group_id') groupId: string,
    @Param('question_id') questionId: string,
    @Body() data: UpdateOneCbiQuestionDto,
  ) {
    return await this.cbiQuestionAdminService.updateOneCbiQuestion(
      groupId,
      questionId,
      data,
    );
  }

  @Delete(`:id/levels/:level_id/groups/:group_id/questions/:question_id`)
  @ApiOperation({ summary: 'Delete one cbi question' })
  async deleteOneCbiLevelGroupQuestion(
    @Param('id') id: string,
    @Param('level_id') levelId: string,
    @Param('group_id') groupId: string,
    @Param('question_id') questionId: string,
  ) {
    return await this.cbiQuestionAdminService.deleteOneCbiQuestion(
      groupId,
      questionId,
    );
  }
}
