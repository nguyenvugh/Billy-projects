import { PartialType } from '@nestjs/swagger';
import { CreateOneCbiDto } from './create-one-cbi.dto';

export class UpdateOneCbiDto extends PartialType(CreateOneCbiDto) {}
