import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  IsValidText,
  MatchField,
} from 'src/common/decorators/custom-validator.decorator';
import { RegisterDTO } from '../register.dto';

export class ChangeUserClientPasswordDTO extends PickType(RegisterDTO, [
  'password',
]) {
  @IsString()
  @MatchField('password', {
    message: 'Your password and confirm password are not identical',
  })
  @ApiProperty()
  confirmPassword: string;

  constructor(partial: Partial<ChangeUserClientPasswordDTO>) {
    super();
    Object.assign(this, partial);
  }
}
