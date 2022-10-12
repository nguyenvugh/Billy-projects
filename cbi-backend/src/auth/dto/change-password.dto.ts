import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import {
  IsValidText,
  MatchField,
} from 'src/common/decorators/custom-validator.decorator';
import { RegisterDTO } from './register.dto';

export class ChangePasswordDTO extends PickType(RegisterDTO, ['password']) {
  @IsString()
  @MatchField('password', {
    message: 'Your password and confirm password are not identical',
  })
  @ApiProperty()
  confirmPassword: string;

  @ApiProperty()
  @IsValidText({ minLength: 8 })
  oldPassword: string;

  constructor(partial: Partial<ChangePasswordDTO>) {
    super();
    Object.assign(this, partial);
  }
}
