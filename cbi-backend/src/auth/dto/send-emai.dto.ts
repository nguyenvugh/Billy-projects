import { PickType } from '@nestjs/swagger';

import { RegisterDTO } from './register.dto';

export class SendEmailDTO extends PickType(RegisterDTO, ['email'] as const) {}
