import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtCoreService } from 'src/jwt-core/jwt-core.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtCoreService: JwtCoreService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToRpc().getData();
    const authorizationHeader = request?.authorization;
    const bearerToken = authorizationHeader?.replace(/Bearer/, '');
    if (!bearerToken || bearerToken === '') {
      return false;
    } else {
      const isVerified = await this.jwtCoreService.verify(bearerToken.trim());
      if (!isVerified) {
        return false;
      }
      request['user_id'] = isVerified?.id;
      request['permissions'] = isVerified?.permissions;
      return request;
    }
  }
}
