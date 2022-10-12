import { Injectable } from '@nestjs/common';
import { AdminRepository } from 'src/admin/repositories/admin.repository';
import { AdminSexConst } from 'src/common/constants/admin.constant';
import { CommonErrorCodes } from 'src/common/error-codes/common.error-code';
import { UserErrorCodes } from 'src/common/error-codes/user.error-code';
import HashHelper from 'src/common/helpers/hash.helper';
import { UpdateUserProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly adminRepository: AdminRepository,
    private readonly hashHelper: HashHelper,
  ) { }

  async findOne(id: number): Promise<any> {
    try {
      const admin = await this.adminRepository.findOne(id, {
        relations: ['avatar_obj'],
      });
      return admin || null;
    } catch (err) {
      return null;
    }
  }

  async update(id, data: UpdateUserProfileDto): Promise<any> {
    try {
      const {
        avatar,
        password,
        fullname,
        sex,
        national_id,
        phone_number,
        address,
      } = data;
      if (password && password === '') {
        const errorCode = 'user::003';
        return {
          code: 422,
          errorCode,
          message: UserErrorCodes[errorCode],
        };
      }
      if (sex) {
        if (!this.validateSex(sex).value) {
          return this.validateSex(sex).error;
        }
      }
      const admin = await this.adminRepository.findOne(id);
      if (admin) {
        const payload = {
          avatar,
          fullname,
          sex,
          national_id,
          phone_number,
          address,
        };
        if (password && password !== '') {
          payload['password'] = await this.hashHelper.hashPassword(password);
        }
        await this.adminRepository.update(id, payload);
        return {
          code: 200,
          message: 'Update user successfully',
        };
      } else {
        const errorCode = 'user::001';
        return {
          code: 404,
          errorCode,
          message: UserErrorCodes[errorCode],
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

  private validateSex(sex: AdminSexConst) {
    const sexes = Object.keys(AdminSexConst);
    if (sexes.includes(sex + '')) {
      return {
        value: true,
      };
    } else {
      const errorCode = 'user::002';
      return {
        value: false,
        error: {
          code: 404,
          errorCode,
          message: UserErrorCodes[errorCode],
        },
      };
    }
  }
}
