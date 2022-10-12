import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { MicroserviceConsts } from 'src/common/constants/microservices';
import { Response } from 'express';

@Controller(`${MicroserviceConsts.PREFIX.ADMIN}/auth`)
@ApiTags('Admin Authentication')
export class AuthController {

  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login on web admin' })
  @ApiBody({
    type: LoginDto,
  })
  @ApiConsumes('application/x-www-form-urlencoded')
  async login(@Body() loginInfo: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(loginInfo);
    const { code } = result;
    res.status(code).send(result);
  }
}
