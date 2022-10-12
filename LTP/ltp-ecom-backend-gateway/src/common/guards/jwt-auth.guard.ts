import { ExecutionContext, HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { UnauthorizedExc } from '../exceptions/custom.exception';
import { get } from '../helpers/util.helper';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const tokenAuth = get(req.headers, 'authorization', '');
    const jwtAuthenticateIsOptional = this.reflector.get<boolean>(
      'jwt_authenticate_is_optional',
      context.getHandler(),
    );

    // If tokenAuth is not pass on request.
    if (tokenAuth === '' && jwtAuthenticateIsOptional) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedExc();
    }
    return user;
  }
}
