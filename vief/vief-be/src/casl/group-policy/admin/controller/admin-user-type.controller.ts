import { Body, Controller, Post, Get } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBody,
  ApiConsumes,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ADMIN_PREFIX_API } from '../../../../common/constants/admin.constant';
import { AdminAuthenticate } from '../../../../common/decorators/auth.decorator';
import { ManualSerialize } from '../../../../common/interceptors/serialize.interceptor';
import { AdminGetGroupPoliciesResultDto } from '../dto/res/admin-get-group-policies-result.dto';
import { AdminGroupPolicySerrvice } from '../service/admin-group-policy.service';

@Controller(`${ADMIN_PREFIX_API}/group-policies`)
@AdminAuthenticate()
// TODO: apply casl
@ApiTags('Admin Manage User Types')
@ApiBearerAuth()
export class AdminGroupPolicyController {
  constructor(private readonly groupPolicySerrvice: AdminGroupPolicySerrvice) {}

  @Get()
  @ManualSerialize(AdminGetGroupPoliciesResultDto)
  @ApiOperation({ summary: 'Get list user types' })
  getGroupPolicies() {
    return this.groupPolicySerrvice.getGroupPolicies();
  }
}
