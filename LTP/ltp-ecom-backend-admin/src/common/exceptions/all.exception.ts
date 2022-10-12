import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  RpcExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { Observable, throwError } from 'rxjs';

// @Catch(RpcException)
// export class AllExceptionsFilter implements RpcExceptionFilter<RpcException> {
//   catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
//     console.log('exception', exception);
//     console.log('exception', exception.getError());
//     return throwError(exception.getError());
//   }
// }

import { BaseRpcExceptionFilter } from '@nestjs/microservices';

@Catch()
export class AllExceptionsFilter extends BaseRpcExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    // console.log('exception', exception);
    return super.catch(exception, host);
  }
}
