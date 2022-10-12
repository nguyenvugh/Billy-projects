import { Injectable, PipeTransform } from '@nestjs/common';
import { isDefined, isEnum } from 'class-validator';
import { BadRequestExc } from '../exceptions/custom.exception';

@Injectable()
export class EnumValidationPipe implements PipeTransform<string, string> {
  constructor(private enumEntity: Record<string, any>) {}

  transform(value: string): string {
    if (isDefined(value) && isEnum(value, this.enumEntity)) {
      return value;
    } else {
      // const errorMessage = `the value ${value} is not valid. See the acceptable values: ${Object.keys(
      //   this.enumEntity,
      // ).map((key) => this.enumEntity[key])}`;
      throw new BadRequestExc();
    }
  }
}
