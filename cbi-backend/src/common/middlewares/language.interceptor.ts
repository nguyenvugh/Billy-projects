import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class LanguageInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<void> {
    const ctx = context.switchToHttp();
    const request: Request = ctx.getRequest();
    request.header['Accept-Language'] = '*';
    request.header['lang'] = '*';
    return next.handle();
  }
}
