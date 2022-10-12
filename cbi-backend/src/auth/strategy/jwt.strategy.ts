import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ConfigService } from '@nestjs/config';
import { IGlobalConfig } from 'src/common/config/global.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly userService: UserService,
    configService: ConfigService<IGlobalConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.jwtSecretKey', { infer: true }),
      algorithms: ['HS256'],
    });
  }

  async validate(payload: any) {
    const { usernameOrEmail } = payload;
    const user = await this.userService.getActiveUser(usernameOrEmail);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}
