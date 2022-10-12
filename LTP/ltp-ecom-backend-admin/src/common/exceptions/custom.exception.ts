import { RpcException } from '@nestjs/microservices';
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
  ForbiddenException,
} from '@nestjs/common';
import { PrefixException } from '../constants';

// export class ForbiddenExc extends RpcException {
//   constructor(private errMsg: string = 'Forbidden Exception!') {
//     super(errMsg);
//   }
// }
export class NotFoundExc extends RpcException {
  constructor(private errMsg: string = 'Not Found!') {
    super(`${PrefixException.NotFound}${errMsg}`);
  }
}

export class UnauthorizedExc extends RpcException {
  constructor(private errMsg: string = 'Please login!!!') {
    super(`${PrefixException.Unothorized}${errMsg}`);
  }
}

export class ConflictExc extends RpcException {
  constructor(private errMsg: string = 'Conflict Resource Exception') {
    super(`${PrefixException.Conflict}${errMsg}`);
  }
}

export class BadRequestExc extends RpcException {
  constructor(private errMsg: string = 'Bad request') {
    super(`${PrefixException.BadRequest}${errMsg}`);
  }
}

export class InternalServerErrorExc extends RpcException {
  constructor(
    private errMsg: string = 'Server is meeting some internal error. Please try on later!',
  ) {
    super(errMsg);
  }
}

export class RpcErrorExc extends RpcException {
  constructor(
    private errMsg: string = 'Server is meeting some internal error. Please try on later!',
  ) {
    super(errMsg);
  }
}
