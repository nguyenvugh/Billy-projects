import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { FirebaseAuthenGuard } from '../../auth/guard/firebase-authen.guard';
import { JwtAuthGuard as AdminJwtAuthGuard } from '../../user/admin/guard/jwt-auth.guard';

export const Authenticate = () =>
  applyDecorators(UseGuards(FirebaseAuthenGuard), ApiBearerAuth());

export const AdminAuthenticate = () =>
  applyDecorators(UseGuards(AdminJwtAuthGuard));

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
