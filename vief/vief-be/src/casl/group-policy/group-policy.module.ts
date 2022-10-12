import { Module } from '@nestjs/common';
import { AdminGroupPolicyModule } from './admin/admin-group-policy.module';

@Module({
  imports: [AdminGroupPolicyModule],
})
export class GroupPolicyModule {}
