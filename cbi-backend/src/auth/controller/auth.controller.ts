import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BooleanStatusEnum } from '../../common/constants/global.constant';
import { User } from 'src/common/decorators/user.decorator';
import {
  ManualSerialize,
  Serialize,
} from 'src/common/interceptors/serialize.interceptor';
import { LoginDTO } from '../dto/login.dto';
import { RegisterDTO } from '../dto/register.dto';
import { SendEmailDTO } from '../dto/send-emai.dto';
import { UserService } from '../service/user.service';
import { User as UserEntity } from '../entities/user.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ProfileDTO } from '../dto/profile.dto';
import { UpdateProfileDTO } from '../dto/update-profile';
import { ChangePasswordDTO } from '../dto/change-password.dto';
import { ProfileResDTO } from '../dto/res/profile.res.dto';
import { ProfileGetCbiUsersSubmitted } from '../../cbi-user/cbi-user/user/dto/request/profile-get-cbi-users-submitted.dto';
import { ProfileGetCbiUsersSubmittedResult } from '../../cbi-user/cbi-user/user/dto/response/profile-get-cbi-users-submitted-result.dto';
import { CheckUserCanOpenSpecialCbiResult } from '../../cbi-user/cbi-user/user/dto/response/check-user-can-open-special-cbi-result.dto';
import { UserService as CbiUserUserService } from '../../cbi-user/cbi-user/user/user.service';
import { ProfileGetCbiUserLevelsSubmittedResultDto } from '../../cbi-user/cbi-user-level/user/dto/response/profile-get-cbi-user-levels-submitted-result.dto';
import { GetCbiLevelGroupsFullQuestionsResultDto as UserGetCbiLevelGroupsFullQuestionsResultDto } from '../../cbi/cbi-level-group/user/dto/response/get-cbi-level-groups-full-questions-result.dto';
import { UserService as CbiUserLevelUserService } from '../../cbi-user/cbi-user-level/user/user.service';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private cbiUserUserService: CbiUserUserService,
    private cbiUserLevelUserService: CbiUserLevelUserService,
  ) {}

  @Post('login')
  @ApiBody({ type: LoginDTO })
  async login(@Body() body: LoginDTO) {
    return this.userService.login(body);
  }
  @Post('register')
  @ApiBody({ type: RegisterDTO })
  async sendEmail(@Body() body: RegisterDTO) {
    return this.userService.register(body);
  }

  @Post('verify-email/:token')
  async verifyEmail(@Param('token') token: string) {
    return this.userService.verifyEmail(token);
  }

  @Get('profile')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ManualSerialize(ProfileResDTO)
  async getProfile(@User() user: UserEntity) {
    return this.userService.findProfile(user.id);
  }

  // @Post('update-profile')
  // @ApiBearerAuth()
  // @UseGuards(JwtAuthGuard)
  // @ApiBody({ type: UpdateProfileDTO })
  // async updateProfile(
  //   @User() user: UserEntity,
  //   @Body() body: UpdateProfileDTO,
  // ) {
  //   return this.userService.updateProfile(user, body);
  // }

  @Post('change-password')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: ChangePasswordDTO })
  async changePassword(
    @User() user: UserEntity,
    @Body() body: ChangePasswordDTO,
  ) {
    return this.userService.changePassword(user, body);
  }

  @Get('cbi-users')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ManualSerialize(ProfileGetCbiUsersSubmittedResult)
  @ApiOkResponse({ type: ProfileGetCbiUsersSubmittedResult })
  async profileGetCbiUsersSubmitted(
    @User() user: UserEntity,
    @Query() params: ProfileGetCbiUsersSubmitted,
  ) {
    return await this.cbiUserUserService.profileGetCbiUsersSubmitted(
      user.id,
      params,
    );
  }

  @Get('cbi-users/:cbi_user_id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ManualSerialize(ProfileGetCbiUserLevelsSubmittedResultDto)
  @ApiOkResponse({ type: ProfileGetCbiUserLevelsSubmittedResultDto })
  async profileGetCbiUserLevelsSubmitted(
    @User() user: UserEntity,
    @Param('cbi_user_id') cbiUserId: string,
  ) {
    return await this.cbiUserLevelUserService.profileGetCbiUserLevelsSubmitted(
      user.id,
      cbiUserId,
    );
  }

  @Get('cbi-users/:cbi_user_id/cbi-user-levels/:cbi_user_level_id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ManualSerialize(UserGetCbiLevelGroupsFullQuestionsResultDto)
  @ApiOkResponse({ type: UserGetCbiLevelGroupsFullQuestionsResultDto })
  async profileGetCbiUserLevelSubmitted(
    @User() user: UserEntity,
    @Param('cbi_user_id') cbiUserId: string,
    @Param('cbi_user_level_id') cbiUserLevelId: string,
  ) {
    return await this.cbiUserLevelUserService.profileGetCbiUserLevelSubmitted(
      user.id,
      cbiUserLevelId,
    );
  }

  @Get('can-open-special-cbi')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ManualSerialize(CheckUserCanOpenSpecialCbiResult)
  @ApiOkResponse({ type: CheckUserCanOpenSpecialCbiResult })
  async checkUserCanOpenSpecialCbi(@User() user: UserEntity) {
    const checkUserCanOpenSpecialCbi =
      await this.cbiUserUserService.checkUserCanOpenSpecialCbi(user.id);
    return checkUserCanOpenSpecialCbi
      ? {
          result: BooleanStatusEnum.TRUE,
        }
      : {
          result: BooleanStatusEnum.FALSE,
        };
  }
}
