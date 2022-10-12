import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { plainToInstance } from 'class-transformer';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IGlobalConfig } from 'src/common/config/global.config';
import { CaslService } from '../casl.service';
import { UserWithPoliciesDto } from '../dtos/transform/userWithPolicies.dto';

@Injectable()
export class JwtCaslStrategy extends PassportStrategy(Strategy, 'jwt-casl') {
  constructor(
    private caslService: CaslService,
    configService: ConfigService<IGlobalConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.jwtSecretKey', { infer: true }),
      algorithms: ['HS256'],
    });
  }

  async validate(payload: any): Promise<UserWithPoliciesDto | false> {
    const { usernameOrEmail } = payload;

    const user = await this.caslService.getUserWithPolicies(usernameOrEmail);

    const userWithPolicies = plainToInstance(UserWithPoliciesDto, user);

    if (!userWithPolicies) return false;
    return userWithPolicies;
  }
}
