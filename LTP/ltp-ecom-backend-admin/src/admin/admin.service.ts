import { Injectable } from '@nestjs/common';
import { DeletedConst } from 'src/common/constants';
import {
  AdminSexConst,
  AdminStatusConst,
} from 'src/common/constants/admin.constant';
import { AdminErrorCodes } from 'src/common/error-codes/admin.error-code';
import { CommonErrorCodes } from 'src/common/error-codes/common.error-code';
import HashHelper from 'src/common/helpers/hash.helper';
import { parseOffsetAndLimit } from 'src/common/helpers/paginate.helper';
import { GroupRepository } from 'src/group/repositories/group.repository';
import { CreateAdminDto } from './dto/create.dto';
import { FindAllAdmin } from './dto/find-all.dto';
import { UpdateAdminDto } from './dto/update.dto';
import { AdminRepository } from './repositories/admin.repository';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly groupRepository: GroupRepository,
    private readonly hashHelper: HashHelper,
  ) { }

  async findAll(findRequest: FindAllAdmin): Promise<any> {
    try {
      const { offset, limit } = parseOffsetAndLimit(
        findRequest.page,
        findRequest.limit,
      );
      const [results, totalRecords] = await this.adminRepository.findAndCount({
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

  async create(data: CreateAdminDto): Promise<any> {
    try {
      const {
        username,
        password,
        fullname,
        group_id,
        status,
        sex,
        national_id,
        phone_number,
        address,
      } = data;
      if (!group_id) {
        const errorCode = 'admin::008';
        return {
          code: 422,
          errorCode,
          message: AdminErrorCodes[errorCode],
        };
      }
      if (!username) {
        const errorCode = 'admin::003';
        return {
          code: 422,
          errorCode,
          message: AdminErrorCodes[errorCode],
        };
      } else {
        const checkExist = await this.adminRepository.findOne({ username });
        if (checkExist) {
          const errorCode = 'admin::004';
          return {
            code: 422,
            errorCode,
            message: AdminErrorCodes[errorCode],
          };
        }
      }
      if (!password) {
        const errorCode = 'admin::005';
        return {
          code: 422,
          errorCode,
          message: AdminErrorCodes[errorCode],
        };
      }
      if (!this.validateStatus(status).value) {
        return this.validateStatus(status).error;
      }
      if (sex) {
        if (!this.validateSex(sex).value) {
          return this.validateStatus(sex).error;
        }
      }
      const payload = {
        group: group_id,
        username,
        password: await this.hashHelper.hashPassword(password),
        fullname,
        status,
        sex,
        national_id,
        phone_number,
        address,
      };
      await this.adminRepository.save(payload);
      await this.updateCount(group_id);
      return {
        code: 200,
        data: 'Admin created successfully',
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

  private async updateCount(id): Promise<any> {
    const adminMatched = await this.adminRepository.count({ group: id });
    const payload = {
      id,
      count: adminMatched,
    };
    return await this.groupRepository.save(payload);
  }

  private async updateCountMultiple(): Promise<any> {
    const groups = await this.groupRepository.find();
    for (const group of groups) {
      await this.updateCount(group.id);
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const admin = await this.adminRepository.findOne(id);
      return admin || null;
    } catch (err) {
      return null;
    }
  }

  async findByUsername(username: string): Promise<any> {
    return await this.adminRepository.findOne({
      relations: ['group_obj'],
      where: {
        username,
      },
      select: ['id', 'username', 'password', 'fullname', 'status'],
    });
  }

  async update(data: UpdateAdminDto): Promise<any> {
    try {
      const {
        id,
        username,
        password,
        fullname,
        group_id,
        status,
        sex,
        national_id,
        phone_number,
        address,
      } = data;
      if (!group_id) {
        const errorCode = 'admin::008';
        return {
          code: 422,
          errorCode,
          message: AdminErrorCodes[errorCode],
        };
      }
      if (!username) {
        const errorCode = 'admin::003';
        return {
          code: 422,
          errorCode,
          message: AdminErrorCodes[errorCode],
        };
      } else {
        const checkExist = await this.adminRepository.findOne({ username });
        if (checkExist && checkExist.id !== id) {
          const errorCode = 'admin::004';
          return {
            code: 422,
            errorCode,
            message: AdminErrorCodes[errorCode],
          };
        }
      }
      if (password && password === '') {
        const errorCode = 'admin::005';
        return {
          code: 422,
          errorCode,
          message: AdminErrorCodes[errorCode],
        };
      }
      if (!this.validateStatus(status).value) {
        return this.validateStatus(status).error;
      }
      if (sex) {
        if (!this.validateSex(sex).value) {
          return this.validateSex(sex).error;
        }
      }
      const admin = await this.adminRepository.findOne(id);
      if (admin) {
        const payload = {
          id,
          group: group_id,
          username,
          fullname,
          status,
          sex,
          national_id,
          phone_number,
          address,
        };
        if (password && password !== '') {
          payload['password'] = await this.hashHelper.hashPassword(password);
        }
        await this.adminRepository.save(payload);
        return {
          code: 200,
          message: 'Update admin successfully',
        };
      } else {
        const errorCode = 'admin::002';
        return {
          code: 404,
          errorCode,
          message: AdminErrorCodes[errorCode],
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

  async delete(ids: string): Promise<any> {
    const idsArr = ids.split(',');
    const admin = await this.adminRepository.findByIds(idsArr);
    if (admin && admin.length > 0) {
      for (const item of admin) {
        item.deleted_at = new Date();
        item.deleted = DeletedConst.DELETED;
        await this.adminRepository.save(item);
      }
      this.updateCountMultiple();
      return {
        code: 200,
        message: 'Selected admin deleted successfully',
      };
    } else {
      const errorCode = 'admin::002';
      return {
        code: 404,
        errorCode,
        message: AdminErrorCodes[errorCode],
      };
    }
  }

  private validateStatus(status: AdminStatusConst) {
    if (status) {
      const statuses = Object.keys(AdminStatusConst);
      if (statuses.includes(status + '')) {
        return {
          value: true,
        };
      } else {
        const errorCode = 'admin::007';
        return {
          value: false,
          error: {
            code: 404,
            errorCode,
            message: AdminErrorCodes[errorCode],
          },
        };
      }
    } else {
      const errorCode = 'admin::006';
      return {
        value: false,
        error: {
          code: 422,
          errorCode,
          message: AdminErrorCodes[errorCode],
        },
      };
    }
  }

  private validateSex(sex: AdminSexConst) {
    const sexes = Object.keys(AdminSexConst);
    if (sexes.includes(sex + '')) {
      return {
        value: true,
      };
    } else {
      const errorCode = 'admin::010';
      return {
        value: false,
        error: {
          code: 404,
          errorCode,
          message: AdminErrorCodes[errorCode],
        },
      };
    }
  }
}
