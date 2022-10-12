import { Body, Controller, Get, Post, Res, Headers } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { MicroserviceConsts } from 'src/common/constants/microservices';
import { UpdateUserProfileDto } from './dto/update-profile.dto';
import { UsersService } from './users.service';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/users`)
@ApiTags('Admin User Management')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiConsumes('application/x-www-form-urlencoded')
  async findOne(
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.usersService.findOne(authorization);
    const { code } = result;
    res.status(code).send(result);
  }

  @Post('profile')
  @ApiOperation({ summary: 'Update user profile' })
  @ApiConsumes('application/json')
  @ApiBody({
    type: UpdateUserProfileDto,
  })
  async update(
    @Body() updateBody: UpdateUserProfileDto,
    @Res() res: Response,
    @Headers('Authorization') authorization: string,
  ) {
    const result = await this.usersService.update(authorization, updateBody);
    const { code } = result;
    res.status(code).send(result);
  }
}
