import { I18nService } from 'nestjs-i18n';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { IException } from '../interfaces/exception.interface';
import { DottedLanguageObjectStringPaths } from '../interfaces/translate.interface';
import { TranslateService } from '../../utils-module/service/translate.service';

@Catch(HttpException)
export class AllExceptionsFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const lang = ctx.getRequest().i18nLang;
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();
    const message = exception.message;
    /*
    const resException = exception.getResponse() as IException;

    // console.log('resException', resException);
    const { key, args } = resException;
    let keyExc: DottedLanguageObjectStringPaths = key
      ? key
      : 'main.exception.INTERNAL_ERROR';

    // Check status code is 400,404,500 to expose message
    switch (statusCode) {
      case 400:
        keyExc = 'main.exception.BAD_REQUEST';
        break;
      case 404:
        keyExc = key ? key : 'main.exception.ROUTE_NOT_FOUND_ERROR';
        break;
      case 500:
        keyExc = 'main.exception.INTERNAL_ERROR';
        break;
      default:
        break;
    }

    const message = await this.translateService.t(keyExc, {
      lang,
      ...(args && { args }),
    });
    */

    response.status(statusCode).json({ statusCode, message });
  }
}
