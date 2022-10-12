import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { ManualSerialize } from 'src/common/interceptors/serialize.interceptor';
import PaginateDto from 'src/utils-module/pagination/dto/paginate.dto';
import {
  ChangeForgetPassDto,
  ForgetPassDto,
} from '../dto/req/forget-password.dto';
import { ChangeUserClientPasswordDTO } from '../dto/req/change-user-client-password.dto';
import { GetClientManageParams } from '../dto/req/get-client-manage-params.dto';
import { UpdateClientProfileDTO } from '../dto/req/update-client-profile.dto';
import { UpdateStatusClientManage } from '../dto/req/update-status-client-manage.dto';
import { GetClientManageDTO } from '../dto/res/get-client-manage.dto';
import { ProfileResDTO } from '../dto/res/profile.res.dto';
import { User as UserEntity } from '../entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UserService } from '../service/user.service';
import { Public } from 'src/common/decorators/public-api.decorator';

@Controller('client-manage')
@ApiTags('Client-manage')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class ClientManageController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ManualSerialize(GetClientManageDTO)
  @ApiOperation({ summary: 'Manage list user accounts' })
  @ApiOkResponse({ type: GetClientManageDTO })
  async getAdminAccount(@Query() query: GetClientManageParams) {
    return this.userService.getClientAccount(query);
  }

  // Forget password
  @Post('forget-password')
  @Public()
  async forgetPassword(@Body() body: ForgetPassDto) {
    return this.userService.forgetPassword(body.email);
  }

  @Patch('change-forget-password')
  @ManualSerialize(ProfileResDTO)
  @Public()
  async changeForgetPassword(@Body() body: ChangeForgetPassDto) {
    return this.userService.changePasswordForget(body);
  }

  @Patch('profile')
  @ApiBody({ type: UpdateClientProfileDTO })
  @ManualSerialize(ProfileResDTO)
  async updateProfile(
    @User() user: UserEntity,
    @Body() body: UpdateClientProfileDTO,
  ) {
    return this.userService.updateClientProfile(user, body);
  }

  @Get(':id')
  @ManualSerialize(ProfileResDTO)
  async getAdminAccountById(@Param('id') id: string) {
    return this.userService.findProfile(id);
  }

  @Patch('update-status/:userId')
  @ApiBody({ type: UpdateStatusClientManage })
  @ApiOperation({ summary: 'Update status client user accounts' })
  @ManualSerialize(ProfileResDTO)
  async updateUserClientStatus(
    @Param('userId') userId: string,
    @Body() body: UpdateStatusClientManage,
  ) {
    return this.userService.updateUserAccountStatus(body, userId);
  }

  @Patch('update-password/:userId')
  @ApiBody({ type: ChangeUserClientPasswordDTO })
  @ApiOperation({ summary: 'Update password client user accounts' })
  @ManualSerialize(ProfileResDTO)
  async updatePasswordUserClientStatus(
    @Param('userId') userId: string,
    @Body() body: ChangeUserClientPasswordDTO,
  ) {
    return this.userService.changePasswordUserClient(userId, body);
  }
}
