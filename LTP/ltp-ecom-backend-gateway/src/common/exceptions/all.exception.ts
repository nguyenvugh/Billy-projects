import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpCode } from '../constants/http-code.constant';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger();

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    /**
     * We will return only two type of Error. Internal server error and HTTP request error
     */
    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Server is meeting some internal error. Please try on later!';
    console.log(typeof exception);
    console.log(exception);
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if ('object' == typeof exception) {
      status =
        exception['code'] && HttpCode.hasOwnProperty(exception['code'])
          ? HttpCode[exception['code']]
          : status;
      message = exception['message'] ? exception['message'] : message;
    }

    // console.log('exception root', exception);

    // we need to ignore 404 error route not found here, because web client will create it alot.
    // IF some error happen then we log the request
    if (status !== HttpStatus.NOT_FOUND) {
      let exceptionMsg = '';
      try {
        if (!(exception instanceof HttpException)) {
          exceptionMsg = exception.toString();
          console.log(exception);
        }
      } catch (err) {}
      const loggerMsg = `${status} - ${message} - ${exceptionMsg} - ${
        request.originalUrl
      } - ${request.method} - Query: ${JSON.stringify(
        request.query,
      )} - Params: ${JSON.stringify(request.params)} - Body: ${JSON.stringify(
        request.body,
      )} - Header: ${JSON.stringify(request.headers)}`;

      this.logger.error(loggerMsg);
    }

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
