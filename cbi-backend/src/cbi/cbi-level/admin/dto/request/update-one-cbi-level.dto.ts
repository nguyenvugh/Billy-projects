import { PartialType } from '@nestjs/swagger';
import { CreateOneCbiLevelDto } from './create-one-cbi-level.dto';

export class UpdateOneCbiLevelDto extends PartialType(CreateOneCbiLevelDto) {}
