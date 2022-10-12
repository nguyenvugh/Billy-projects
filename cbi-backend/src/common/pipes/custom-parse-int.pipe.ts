import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { BadRequestExc } from '../exceptions/custom.exception';

@Injectable()
export class CustomParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) throw new BadRequestExc();
    return val;
  }
}
