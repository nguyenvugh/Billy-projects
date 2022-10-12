import { Global, Module } from '@nestjs/common';
import { GroupPolicyModule } from './group-policy/group-policy.module';

@Global()
@Module({
  imports: [GroupPolicyModule],
})
export class CaslModule {}
