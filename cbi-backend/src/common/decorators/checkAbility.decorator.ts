import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AbilityGuard } from 'src/casl/guard/ability.guard';
import { ABILITY_METADATA_KEY } from '../constants/global.constant';
import { RequiredRule } from '../interfaces/requireRule.interface';

export const CheckAbility = (...requirements: RequiredRule[]) => {
  return applyDecorators(
    UseGuards(AbilityGuard),
    SetMetadata(ABILITY_METADATA_KEY, requirements),
    ApiBearerAuth(),
  );
};
