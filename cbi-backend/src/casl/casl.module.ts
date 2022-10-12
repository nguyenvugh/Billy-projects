import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/repository/user.repository';
import { CaslAbilityFactory } from './casl-ability.factory';
import { CaslController } from './casl.controller';
import { CaslService } from './casl.service';
import { GroupPoliciesRepository } from './repositories/group-policies.repository';
import { GroupToPoliciesRepository } from './repositories/group-to-policies.repository';
import { PoliciesRepository } from './repositories/policies.repository';
import { UserToGroupPoliciesRepository } from './repositories/user-to-group-policies.repository';
import { JwtCaslStrategy } from './strategies/jwt-casl.strategy';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      GroupPoliciesRepository,
      GroupToPoliciesRepository,
      PoliciesRepository,
      UserToGroupPoliciesRepository,
    ]),
  ],
  controllers: [CaslController],
  providers: [CaslService, CaslAbilityFactory, JwtCaslStrategy],
  exports: [CaslAbilityFactory, CaslService],
})
export class CaslModule {}
