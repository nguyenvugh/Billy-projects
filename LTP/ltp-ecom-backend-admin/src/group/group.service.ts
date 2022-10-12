import { Injectable } from '@nestjs/common';
import { cloneDeep } from 'lodash';
import { AdminRepository } from 'src/admin/repositories/admin.repository';
import { DeletedConst } from 'src/common/constants';
import { CommonErrorCodes } from 'src/common/error-codes/common.error-code';
import { parseOffsetAndLimit } from 'src/common/helpers/paginate.helper';
import { GroupRepository } from './repositories/group.repository';
import { rolesConst } from '../common/constants/roles.constant';
import { CreateGroupDto } from './dto/create.dto';
import { FindAllGroupDto } from './dto/find-all.dto';
import { UpdateGroupDto } from './dto/update.dto';
import { GroupErrorCodes } from 'src/common/error-codes/group.error-code';
import { Not } from 'typeorm';
import { GroupIsSuperConst } from 'src/common/constants/group.constant';
@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly adminRepository: AdminRepository,
  ) { }

  async findAll(findRequest: FindAllGroupDto): Promise<any> {
    try {
      const { offset, limit } = parseOffsetAndLimit(
        findRequest.page,
        findRequest.limit,
      );
      const [results, totalRecords] = await this.groupRepository.findAndCount({
        order: {
          created_at: 'DESC',
        },
        skip: offset,
        take: limit,
      });
      return {
        results,
        totalRecords,
      };
    } catch (err) {
      return {
        results: [],
        totalRecords: 0,
      };
    }
  }

  async create(data: CreateGroupDto) {
    try {
      const { name, description, permissions } = data;
      const payload = {
        name,
        description,
        count: 0,
        permissions: this.mappingPermissions(rolesConst, permissions),
      };
      const groupCreated = await this.groupRepository.save(payload);
      return {
        code: 200,
        data: groupCreated,
      };
    } catch (err) {
      const errorCode = 'common::001';
      return {
        code: 500,
        errorCode,
        message: CommonErrorCodes[errorCode],
      };
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const group = await this.groupRepository.findOne(id);
      return group || null;
    } catch (err) {
      return null;
    }
  }

  async update(data: UpdateGroupDto) {
    try {
      const { id, name, description, permissions } = data;
      const group = await this.groupRepository.findOne(id);
      if (group) {
        if (group.is_super === GroupIsSuperConst.IS_SUPER) {
          const errorCode = 'group::003';
          return {
            code: 500,
            errorCode,
            message: GroupErrorCodes[errorCode],
          };
        } else {
          const payload = {
            id,
            name,
            description,
            permissions: this.mappingPermissions(
              group.permissions,
              permissions,
            ),
          };
          await this.groupRepository.save(payload);
          return {
            code: 200,
            message: 'Update group successfully',
          };
        }
      } else {
        const errorCode = 'group::002';
        return {
          code: 404,
          errorCode,
          message: GroupErrorCodes[errorCode],
        };
      }
    } catch (err) {
      const errorCode = 'common::001';
      return {
        code: 500,
        errorCode,
        message: CommonErrorCodes[errorCode],
      };
    }
  }

  private mappingPermissions(roles, permissions) {
    const target = cloneDeep(roles);
    const source = {};
    Object.keys(permissions).forEach((key) => {
      if (target.hasOwnProperty(key)) {
        source[key] = permissions[key];
      }
    });
    return Object.assign(target, source);
  }

  async delete(ids: string): Promise<any> {
    const idsArr = ids.split(',');
    const groups = await this.groupRepository.findByIds(idsArr);
    if (groups && groups.length > 0) {
      for (const item of groups) {
        if (item.is_super !== GroupIsSuperConst.IS_SUPER) {
          item.deleted_at = new Date();
          item.deleted = DeletedConst.DELETED;
          await this.groupRepository.save(item);
        }
      }
      return {
        code: 200,
        message: 'Selected group deleted successfully',
      };
    } else {
      const errorCode = 'group::002';
      return {
        code: 404,
        errorCode,
        message: GroupErrorCodes[errorCode],
      };
    }
  }
}
