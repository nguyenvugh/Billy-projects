import { SetMetadata } from '@nestjs/common';

export const JwtAuthenticateIsOptional = () =>
  SetMetadata('jwt_authenticate_is_optional', true);
