import { Injectable } from '@nestjs/common';
import { DeletedConst } from 'src/common/constants';
import { CommonErrorCodes } from 'src/common/error-codes/common.error-code';
import { BranchErrorCodes } from 'src/common/error-codes/branch.error-code';
import { parseOffsetAndLimit } from 'src/common/helpers/paginate.helper';
import { CreateBranchDto } from './dto/create.dto';
import { FindAllBranchDto } from './dto/find-all.dto';
import { UpdateBranchDto } from './dto/update.dto';
import { BranchRepository } from './repositories/branch.repository';

@Injectable()
export class BranchService {
  constructor(private readonly branchRepository: BranchRepository) { }

  async findAll(findRequest: FindAllBranchDto): Promise<any> {
    try {
      const { offset, limit } = parseOffsetAndLimit(
        findRequest.page,
        findRequest.limit,
      );
      const [results, totalRecords] = await this.branchRepository.findAndCount({
        relations: ['city', 'district', 'ward'],
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

  async create(data: CreateBranchDto): Promise<any> {
    try {
      const {
        name,
        phone_number,
        fax,
        lat,
        long,
        city,
        district,
        ward,
        address,
      } = data;
      const checkExist = await this.branchRepository.findOne({
        where: {
          name,
        },
      });
      if (checkExist) {
        const errorCode = 'branch::003';
        return {
          code: 500,
          errorCode,
          message: BranchErrorCodes[errorCode],
        };
      } else {
        const payload = {
          name,
          phone_number,
          fax,
          lat,
          long,
          cityId: city,
          districtId: district,
          wardId: ward,
          address,
        };
        const branchCreated = await this.branchRepository.save(payload);
        return {
          code: 200,
          data: branchCreated,
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

  async update(data: UpdateBranchDto): Promise<any> {
    try {
      const {
        id,
        name,
        phone_number,
        fax,
        lat,
        long,
        city,
        district,
        ward,
        address,
      } = data;
      const branch = await this.branchRepository.findOne(id);
      if (branch) {
        const checkExist = await this.branchRepository.findOne({
          where: {
            name,
          },
        });
        if (checkExist && checkExist.id !== id) {
          const errorCode = 'branch::003';
          return {
            code: 500,
            errorCode,
            message: BranchErrorCodes[errorCode],
          };
        } else {
          const payload = {
            id,
            name,
            phone_number,
            fax,
            lat,
            long,
            cityId: city,
            districtId: district,
            wardId: ward,
            address,
          };
          await this.branchRepository.save(payload);
          return {
            code: 200,
            message: 'Update branch successfully',
          };
        }
      } else {
        const errorCode = 'branch::002';
        return {
          code: 404,
          errorCode,
          message: BranchErrorCodes[errorCode],
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

  async findOne(id: number): Promise<any> {
    try {
      const branch = await this.branchRepository.findOne({
        relations: ['city', 'district', 'ward'],
        where: {
          id,
        },
      });
      return branch || null;
    } catch (err) {
      return null;
    }
  }

  async delete(ids: string): Promise<any> {
    const idsArr = ids.split(',');
    const branches = await this.branchRepository.findByIds(idsArr);
    if (branches && branches.length > 0) {
      for (const branch of branches) {
        branch.deleted_at = new Date();
        branch.deleted = DeletedConst.DELETED;
        await this.branchRepository.save(branch);
      }
      return {
        code: 200,
        message: 'Selected branch deleted successfully',
      };
    } else {
      const errorCode = 'branch::002';
      return {
        code: 404,
        errorCode,
        message: BranchErrorCodes[errorCode],
      };
    }
  }
}
