import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { JWT_ADMIN_GUARD_KEY } from '../../../common/constants/admin.constant';

@Injectable()
export class JwtAuthGuard extends AuthGuard(`${JWT_ADMIN_GUARD_KEY}`) {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user) {
    if (err || !user) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    return user;
  }
}
