import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CheckAbility } from 'src/common/decorators/checkAbility.decorator';
import { PaginateDto } from 'src/common/dto/request/paginate.dto';
import { Action } from 'src/common/enums/action.enum';
import { Resource } from 'src/common/enums/resource.enum';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { CaslService } from './casl.service';
import { CreateAdminUserDto } from './dtos/request/create-admin-user.dto';
import { CreateGroupPolicyDto } from './dtos/request/create-group-policies.dto';
import { DeleteManyGroupPoliciesDto } from './dtos/request/delete-many-group-policies.dto';
import { UpdateGroupPoliciesDto } from './dtos/request/update-group-policies.dto';
import { DetailsGroupPoliciesDto } from './dtos/response/details-group-policies.dto';
import { GetAllGroupPoliciesDto } from './dtos/response/get-all-group-policies.dto';
import { PoliciesDto } from './dtos/response/policies.dto';

@Controller('casl')
@ApiTags('Authorization')
export class CaslController {
  constructor(private caslService: CaslService) {}

  @Get('policies')
  @ApiResponse({ type: PoliciesDto, description: 'Get all policies in db!' })
  getAllPolicies() {
    return this.caslService.getAllPolicies();
  }

  @Post('group-policy')
  @ApiOperation({ description: 'Create group policies' })
  createGroupPolicies(@Body() body: CreateGroupPolicyDto) {
    return this.caslService.createGroupPolicies(body);
  }

  @Get('group-policy')
  @ApiResponse({
    type: GetAllGroupPoliciesDto,
    description: 'Get all group policies with pagination',
  })
  getAllGroupPolicies(@Query() query: PaginateDto) {
    return this.caslService.getAllGroupPolicies(query);
  }

  @Get('group-policy/:key')
  @Serialize(DetailsGroupPoliciesDto)
  @ApiParam({ name: 'key', example: 'article_management' })
  @ApiResponse({
    type: DetailsGroupPoliciesDto,
    description: 'Return details of specified gorup policies',
  })
  getGroupPoliciesByKey(@Param('key') key: string) {
    return this.caslService.getGroupPoliciesByKey(key);
  }

  @Patch('group-policy')
  @Serialize(DetailsGroupPoliciesDto)
  @ApiResponse({
    type: DetailsGroupPoliciesDto,
    description: 'Return details of specified gorup policies',
  })
  updateGroupPolicies(@Body() body: UpdateGroupPoliciesDto) {
    return this.caslService.updateGroupPolicies(body);
  }

  @Delete('/group-policy')
  @ApiResponse({
    type: Number,
    description: 'Number of group policies has been deleted',
  })
  deleteManyGroupPolicies(@Body() body: DeleteManyGroupPoliciesDto) {
    return this.caslService.deleteManyGroupPolicies(body);
  }

  @Delete('group-policy/:key')
  @ApiParam({ name: 'key', example: 'article_management' })
  deleteGroupPolicies(@Param('key') key: string) {
    return this.caslService.deleteGroupPolicies(key);
  }

  //   For local test
  @Post('admin-user')
  createAdminUser(@Body() body: CreateAdminUserDto) {
    return this.caslService.createAdminUser(body);
  }

  //   For local test
  //   Need to be deleted when deploy
  @Get('admin-user/:usernameOrEmail')
  getUserGroupPolicy(@Param('usernameOrEmail') usernameOrEmail: string) {
    return this.caslService.getUserWithPolicies(usernameOrEmail);
  }

  //   For local test
  //   Need to be deleted when deploy
  @Get('test')
  @CheckAbility({ action: Action.MANAGE, subject: Resource.ARTICLE })
  test(@Req() req: any) {
    return req.user;
  }
}
