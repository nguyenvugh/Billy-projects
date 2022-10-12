import { PartialType } from '@nestjs/swagger';
import { CreateOneCbiLevelGroupDto } from './create-one-cbi-level-group.dto';

export class UpdateOneCbiLevelGroupDto extends PartialType(
  CreateOneCbiLevelGroupDto,
) {}
