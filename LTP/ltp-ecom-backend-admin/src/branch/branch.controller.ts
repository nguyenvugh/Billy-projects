import { Controller, UseGuards } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { FindAllBranchDto } from './dto/find-all.dto';

import { AuthGuard } from 'src/common/guards/auth.guard';
import { PermissionsGuard } from 'src/common/guards/permissions.guard';
import { Permissions } from 'src/common/decorators/permissions.decorator';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create.dto';
import { UpdateBranchDto } from './dto/update.dto';

@Controller('branch')
@UseGuards(AuthGuard, PermissionsGuard)
export class BranchController {
  constructor(private readonly branchService: BranchService) { }

  @MessagePattern('admin-branch-find-all')
  @Permissions('branch')
  async findAll({ body }: { body: FindAllBranchDto }) {
    return {
      code: 200,
      data: await this.branchService.findAll(body),
    };
  }

  @MessagePattern('admin-branch-create')
  @Permissions('branch')
  async create({ body }: { body: CreateBranchDto }) {
    return await this.branchService.create(body);
  }

  @MessagePattern('admin-branch-find-one')
  @Permissions('branch')
  async findOne({ body }) {
    const { id } = body;
    const result = await this.branchService.findOne(id);
    return {
      code: result ? 200 : 404,
      data: result || 'Branch not found',
    };
  }

  @MessagePattern('admin-branch-update-one')
  @Permissions('branch')
  async updateOne({ body }: { body: UpdateBranchDto }) {
    const result = await this.branchService.update(body);
    return result;
  }

  @MessagePattern('admin-branch-delete')
  @Permissions('branch')
  async delete({ body }) {
    const { ids } = body;
    const result = await this.branchService.delete(ids);
    return result;
  }
}
