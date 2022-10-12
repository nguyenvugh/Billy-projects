import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IGlobalConfig } from '../../../common/config/global.config';
import { JWT_ADMIN_GUARD_KEY } from '../../../common/constants/admin.constant';
import { AdminService } from '../service/admin.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  `${JWT_ADMIN_GUARD_KEY}`,
) {
  constructor(
    private readonly adminService: AdminService,
    configService: ConfigService<IGlobalConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.admin.jwtSecretKey', {
        infer: true,
      }),
      algorithms: ['HS256'],
    });
  }

  async validate(payload: any) {
    const { email } = payload;
    const user = await this.adminService.getAdminWithPoliciesData(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
