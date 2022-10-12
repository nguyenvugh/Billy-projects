import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupPoliciesRepository } from '../repository/group-policies.repository';
import { AdminGroupPolicyController } from './controller/admin-user-type.controller';
import { AdminGroupPolicySerrvice } from './service/admin-group-policy.service';

@Module({
  imports: [TypeOrmModule.forFeature([GroupPoliciesRepository])],
  controllers: [AdminGroupPolicyController],
  providers: [AdminGroupPolicySerrvice],
  exports: [AdminGroupPolicySerrvice],
})
export class AdminGroupPolicyModule {}
