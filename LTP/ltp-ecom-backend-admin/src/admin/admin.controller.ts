import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create.dto';
import { FindAllAdmin } from './dto/find-all.dto';
import { UpdateAdminDto } from './dto/update.dto';

import { AuthGuard } from 'src/common/guards/auth.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';
@Controller('admin')
@UseGuards(AuthGuard, PermissionsGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) { }

  @MessagePattern('admin-admin-find-all')
  @Permissions('admin')
  async findByCriteria({ body }: { body: FindAllAdmin }) {
    return {
      code: 200,
      data: await this.adminService.findAll(body),
    };
  }

  @MessagePattern('admin-admin-create')
  @Permissions('admin')
  async create({ body }: { body: CreateAdminDto }) {
    return await this.adminService.create(body);
  }

  @MessagePattern('admin-admin-find-one')
  @Permissions('admin')
  async findOne({ body }) {
    const { id } = body;
    const result = await this.adminService.findOne(id);
    return {
      code: result ? 200 : 404,
      data: result || 'Admin not found',
    };
  }

  @MessagePattern('admin-admin-update-one')
  @Permissions('admin')
  async updateOne({ body }: { body: UpdateAdminDto }) {
    const result = await this.adminService.update(body);
    return result;
  }

  @MessagePattern('admin-admin-delete')
  @Permissions('admin')
  async delete({ body }) {
    const { ids } = body;
    const result = await this.adminService.delete(ids);
    return result;
  }
}
