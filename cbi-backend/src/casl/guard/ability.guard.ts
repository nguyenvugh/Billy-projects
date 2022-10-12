import { ForbiddenError } from '@casl/ability';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { CaslAbilityFactory } from 'src/casl/casl-ability.factory';
import { ABILITY_METADATA_KEY } from 'src/common/constants/global.constant';
import { RequiredRule } from 'src/common/interfaces/requireRule.interface';
import { ForbiddenExc } from 'src/common/exceptions/custom.exception';
import { UserWithPoliciesDto } from '../dtos/transform/userWithPolicies.dto';
import { Action } from 'src/common/enums/action.enum';
// import { GetUserWithPoliciesDto } from 'src/user/dtos/get-user-with-policies.dto'

@Injectable()
export class AbilityGuard extends AuthGuard('jwt-casl') {
  constructor(
    private reflector: Reflector,
    private abilityFactory: CaslAbilityFactory,
  ) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const rules = this.reflector.getAllAndOverride<RequiredRule[]>(
      ABILITY_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    // If has rules metadata then authenticate to get user
    if (!rules?.length) return true;

    return super.canActivate(context);
  }

  handleRequest(
    err: any,
    user: UserWithPoliciesDto,
    info: any,
    context: ExecutionContext,
    status?: any,
  ) {
    if (info instanceof Error || !user || err) throw new ForbiddenExc();

    const rules = this.reflector.getAllAndOverride<RequiredRule[]>(
      ABILITY_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    const ability = this.abilityFactory.defineAbility(user);

    try {
      rules.forEach((rule) => {
        ForbiddenError.from(ability).throwUnlessCan(rule.action, rule.subject);
      });
      return user as any;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
