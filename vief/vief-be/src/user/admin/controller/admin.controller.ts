import {
  Body,
  Controller,
  Post,
  Get,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiBody,
  ApiConsumes,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { ADMIN_PREFIX_API } from '../../../common/constants/admin.constant';
import { AdminAuthenticate } from '../../../common/decorators/auth.decorator';
import { CheckAbility } from '../../../common/decorators/checkAbility.decorator';
import { Action, Resource } from '../../../common/enums/global.enum';
import { ManualSerialize } from '../../../common/interceptors/serialize.interceptor';
import { CreateAdminDto } from '../dto/req/create-admin.dto';
import { UpdateAdminDto } from '../dto/req/update-admin.dto';
import { AdminLoginDto } from '../dto/req/login.dto';
import { AdminGetAdminsDto } from '../dto/req/admin-get-admins.dto';
import { CreateAdminResDTO } from '../dto/res/create-admin.dto';
import { AdminGetAdminsResultDto } from '../dto/res/admin-get-admins-result.dto';
import { AdminGetAdminDetailResultDto } from '../dto/res/admin-get-admin-detail-result.dto';
import { AdminService } from '../service/admin.service';

@Controller(`${ADMIN_PREFIX_API}`)
@ApiTags('Admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Admin login' })
  @ApiBody({ type: AdminLoginDto })
  @ApiConsumes('application/x-www-form-urlencoded')
  login(@Body() body: AdminLoginDto) {
    return this.adminService.login(body);
  }

  @Get('/admins')
  @AdminAuthenticate()
  // TODO: apply casl
  @ManualSerialize(AdminGetAdminsResultDto)
  @ApiOperation({ summary: 'Get list admin accounts' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBearerAuth()
  getAdmins(@Query() req: AdminGetAdminsDto) {
    return this.adminService.getAdmins(req);
  }

  @Post('/admins')
  @AdminAuthenticate()
  // TODO: apply casl
  @ManualSerialize(AdminGetAdminDetailResultDto)
  @ApiOperation({ summary: 'Create an admin account' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBearerAuth()
  createAdmin(@Body() body: CreateAdminDto) {
    return this.adminService.createAdmin(body);
  }

  @Get('/admins/:id')
  @AdminAuthenticate()
  // TODO: apply casl
  @ManualSerialize(AdminGetAdminDetailResultDto)
  @ApiOperation({ summary: 'Get detail admin account' })
  @ApiBearerAuth()
  getAdmin(@Param('id') id: number) {
    return this.adminService.getAdmin(id);
  }

  @Patch('/admins/:id')
  @AdminAuthenticate()
  // TODO: apply casl
  @ManualSerialize(AdminGetAdminDetailResultDto)
  @ApiOperation({ summary: 'Update an admin account' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBearerAuth()
  updateAdmin(@Param('id') id: number, @Body() body: UpdateAdminDto) {
    return this.adminService.updateAdmin(id, body);
  }

  @Delete('/admins/:id')
  @AdminAuthenticate()
  // TODO: apply casl
  @ApiOperation({ summary: 'Delete an admin account' })
  @ApiBearerAuth()
  deleteAdmin(@Param('id') id: number) {
    return this.adminService.deleteAdmin(id);
  }
}
