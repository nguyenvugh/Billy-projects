import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateGroupDto } from './dto/create.dto';
import { FindAllGroupDto } from './dto/find-all.dto';
import { UpdateGroupDto } from './dto/update.dto';
import { GroupService } from './group.service';

import { AuthGuard } from 'src/common/guards/auth.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';

@Controller('group')
@UseGuards(AuthGuard, PermissionsGuard)
export class GroupController {
  constructor(private readonly groupService: GroupService) { }

  @MessagePattern('admin-group-find-all')
  @Permissions('group')
  async findAll({ body }: { body: FindAllGroupDto }) {
    return {
      code: 200,
      data: await this.groupService.findAll(body),
    };
  }

  @MessagePattern('admin-group-create')
  @Permissions('group')
  async create({ body }: { body: CreateGroupDto }) {
    return await this.groupService.create(body);
  }

  @MessagePattern('admin-group-update-one')
  @Permissions('group')
  async updateOne({ body }: { body: UpdateGroupDto }) {
    return await this.groupService.update(body);
  }

  @MessagePattern('admin-group-find-one')
  @Permissions('group')
  async findOne({ body }) {
    const { id } = body;
    const result = await this.groupService.findOne(id);
    return {
      code: result ? 200 : 404,
      data: result || 'Group not found',
    };
  }

  @MessagePattern('admin-group-delete')
  @Permissions('group')
  async delete({ body }) {
    const { ids } = body;
    return await this.groupService.delete(ids);
  }
}
