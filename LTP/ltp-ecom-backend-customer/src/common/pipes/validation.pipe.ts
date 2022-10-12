import {
  ArgumentMetadata,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';
import { RpcExc } from '../exceptions/custom.exception';

export class RpcValidationPipe extends ValidationPipe {
  public async transform(value, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        throw new RpcExc(`bad_request:fail`);
      }
    }
  }
}
