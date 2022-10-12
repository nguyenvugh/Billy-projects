import {
  ArgumentMetadata,
  Inject,
  Injectable,
  PipeTransform,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { plainToClass } from 'class-transformer';
import { AdminJwtDto } from '../../auth/dto/admin-jwt.dto';
import { UserRole } from '../constants/global.constant';

/**
 * Use this function to create user type to transform DTO
 * with default value or some other validate
 */

@Injectable({ scope: Scope.REQUEST })
export class TypeUserGroupPipe implements PipeTransform<any> {
  constructor(@Inject(REQUEST) private readonly req: any) {
    // console.log('req User', req.user);
  }

  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const userAuth: AdminJwtDto = this.req.user;
    const groups = this.buildGroups(userAuth);
    const object = plainToClass(metatype, value, { groups });
    return object;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private buildGroups(userAuth: AdminJwtDto): string[] {
    const arrRoleGroup = [];
    if (!userAuth) arrRoleGroup.push(UserRole.USER);
    // if (userAuth?.typeUser) arrRoleGroup.push(userAuth.typeUser);
    return arrRoleGroup;
  }
}
