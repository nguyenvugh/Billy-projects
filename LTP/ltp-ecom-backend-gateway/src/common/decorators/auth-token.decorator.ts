import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { get } from '../helpers/util.helper';

export const AuthToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return get(request.headers, 'authorization', '');
  },
);
