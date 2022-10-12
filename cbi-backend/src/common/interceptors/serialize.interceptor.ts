import {
  CallHandler,
  ExecutionContext,
  mixin,
  NestInterceptor,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

type ClassContructor = {
  new (...args: any[]): any;
};

export function Serialize(dto: ClassContructor) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassContructor) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(
      map((data) =>
        plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
          enableImplicitConversion: true,
        }),
      ),
    );
  }
}

/**
 * Use this function to manual convert data of dto
 * using @Exclude, @Expose, @Transform....
 */

export function ManualSerialize(dto: ClassContructor) {
  return UseInterceptors(new ManulSerializeInterceptor(dto));
}

class ManulSerializeInterceptor implements NestInterceptor {
  constructor(private dto: ClassContructor) {}

  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    return handler.handle().pipe(map((data) => plainToClass(this.dto, data)));
  }
}
