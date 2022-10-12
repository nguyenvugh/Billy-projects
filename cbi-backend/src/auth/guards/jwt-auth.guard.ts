import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { ABILITY_METADATA_KEY } from 'src/common/constants/global.constant';
import { RequiredRule } from 'src/common/interfaces/requireRule.interface';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    //  If route has rules, meaning it has authorization, so we don't need to authenticate again
    const rules = this.reflector.getAllAndOverride<RequiredRule[]>(
      ABILITY_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (rules) return true;

    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return user;
  }
}
