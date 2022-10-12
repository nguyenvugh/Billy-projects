import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const msg: any = exception.getError();
    const msgParse: any[] = msg.split(':');
    return throwError({
      code: msgParse[0],
      message: msgParse[1],
    });
  }
}
